import React, { useEffect, useState } from "react";
import axios from "axios";
import * as _ from "lodash";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import {
  bodyRequest,
  headers,
  quoteRequest,
  disablePastDate,
} from "../../helpers/utils";
import DefaultImg from "../../assets/images/no_image.png";
import Guest from "../../assets/images/guest.png";
import Night from "../../assets/images/night.png";
import { endpoints } from "../../helpers/endpoints";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./style.scss";
import Map from "../../components/Maps";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [language] = useOutletContext();
  const { t } = useTranslation();

  const curr = new Date();
  const date = curr.toISOString().substr(0, 10);

  const [service, setService] = useState();
  const [bookingQuotes, setBookingQuotes] = useState([]);

  const detailRequest = bodyRequest;

  detailRequest.request.Language = `${language}-JP`;
  quoteRequest.request.Language = `${language}`;

  detailRequest.request.Filter.Ids = [id];

  useEffect(() => {
    detailRequest.request.Output.Children = {
      Output: {
        CommonContent: {
          All: true,
        },
        Features: true,
        Rating: true,
        Reviews: {
          IncludeFullDescription: true,
          IncludeShortReview: true,
          MaxReturnCount: 10,
          MaxReturnCountSpecified: true,
        },
        Availability: {
          StartDate: new Date(),
          NumberOfDays: 7,
          MergeMethod: 2,
          FlagCampaign: true,
        },
      },
      Children: {
        Filter: {
          Ids: null,
          Type: 4,
        },
      },
    };
    axios
      .post(endpoints.search, detailRequest, { headers: headers })
      .then((response) => {
        setService(response.data.Entities[0]);
      });
  }, [searchParams, location]);

  /* eslint-disable */
  const getQuote = (values) => {
    quoteRequest.request.Configurations[0].Pax.Adults = parseInt(values.pax);
    quoteRequest.request.CommencementDate = new Date(values.date);
    quoteRequest.request.Duration = parseInt(values.duration);
    if (service && service.Children.length > 0) {
      setBookingQuotes([]);
      service.Children.map((children, i) => {
        quoteRequest.request.IndustryCategoryGroup =
          children.IndustryCategoryGroups[0];
        quoteRequest.request.IndustryCategory = children.IndustryCategory;
        quoteRequest.request.Configurations[0].ProductId = children.Id;
        axios
          .post(endpoints.bookingQuote, quoteRequest, { headers: headers })
          .then((response) => {
            const mergeData = { ...service.Children[i], ...response.data };
            setBookingQuotes((data) => [...data, mergeData]);
          });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      date: e.target[0].value,
      duration: e.target[1].value,
      pax: e.target[2].value,
    };
    getQuote(values);
  };

  function getServiceType() {
    let serviceType = t("accommodation");
    if (service && service.IndustryCategoryGroups) {
      switch (service.IndustryCategoryGroups[0]) {
        case 0:
          serviceType = t("accommodation");
          break;
        case 1:
          serviceType = t("activity");
          break;
        case 2:
          serviceType = t("restaurant");
          break;
        case 3:
          serviceType = t("produce");
          break;
        default:
          return t("accommodation");
      }
    }

    return serviceType;
  }

  const settings = {
    dots: true,
  };

  return (
    <div className="container">
      <Row className="product">
        {service && (
          <Col xs={12} className="productWrapper">
            <div className="serviceType">{getServiceType()}</div>
            <h2 className="title mb-5">{service.Name}</h2>
            <div className="carousel">
              {service.Images !== null ? (
                <Slider {...settings}>
                  {service.Images.map((service, i) => {
                    return (
                      <div key={i}>
                        <img className="image" src={service.Url} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <img src={DefaultImg} />
              )}
            </div>
            <div
              className="description mb-3"
              dangerouslySetInnerHTML={{ __html: service.LongDescription }}
            ></div>
            <div className="checkPrice mb-4">
              <h4>Check Price & Availability</h4>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="formDate">
                      <Form.Control
                        className="me-2"
                        type="date"
                        defaultValue={date}
                        min={disablePastDate()}
                      />
                    </div>
                    {service &&
                      service.IndustryCategoryGroups &&
                      service.IndustryCategoryGroups[0] === 0 && (
                        <div className="formIcon">
                          <div className="icon">
                            <img src={Night} />
                          </div>
                          <Form.Control
                            className="me-2"
                            defaultValue={1}
                            type="number"
                            name="duration"
                          />
                        </div>
                      )}
                    {service &&
                      service.IndustryCategoryGroups &&
                      service.IndustryCategoryGroups[0] !== 3 && (
                        <div className="formIcon">
                          <div className="icon">
                            <img src={Guest} />
                          </div>
                          <Form.Control
                            className="me-2"
                            defaultValue={2}
                            type="number"
                            name="pax"
                          />
                        </div>
                      )}
                  </div>
                  <div>
                    <Button type="submit" variant="secondary">
                      {t("search")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="availableProducts mb-4">
              <div className="sectionTitle">
                <span>{t("available_products")}</span>
              </div>
              <div className="items">
                {_.sortBy(bookingQuotes, "Name").map((children, i) => (
                  <div key={i} className="productItem row align-items-center">
                    <div className="info col-12 col-lg-10">
                      <div className="name">
                        {children.Configurations[0].Name}
                      </div>
                      <div className="image">
                        <img
                          width={100}
                          height="auto"
                          src={
                            children.Images
                              ? children.Images[0].Url
                              : DefaultImg
                          }
                        />
                      </div>
                      <div className="price">
                        Price: &nbsp;
                        {children.TxCurrencyCode === "JPY" ? "¥" : ""}
                        {children.Configurations[0].Quotes &&
                          children.Configurations[0].Quotes[0].TotalPrice}
                      </div>
                      <div
                        className="desc"
                        dangerouslySetInnerHTML={{
                          __html: children.LongDescription,
                        }}
                      ></div>
                    </div>
                    <div className="action col-12 col-lg-2">
                      <Button variant="primary">Book Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="info mb-4">
              <div className="sectionTitle">
                <span>{t("basic_info")}</span>
              </div>
              <Table borderless responsive>
                <tbody>
                  <tr>
                    <td>{t("name")}</td>
                    <td>{service.Name}</td>
                  </tr>
                  <tr>
                    <td>{t("price")}</td>
                    <td>{service.Availability.Calendar.LowestRate}</td>
                  </tr>
                  <tr>
                    <td>{t("address")}</td>
                    <td>
                      {service.PhysicalAddress.Line1},{" "}
                      {service.PhysicalAddress.City},{" "}
                      {service.PhysicalAddress.PostCode},{" "}
                      {service.PhysicalAddress.State}
                    </td>
                  </tr>
                  <tr>
                    <td>{t("phone")}</td>
                    <td>{service.MainPhone.FullPhoneNumberLocalised}</td>
                  </tr>
                  <tr>
                    <td>{t("website")}</td>
                    <td>{service.Website || "No Public Website"}</td>
                  </tr>
                  <tr>
                    <td>{t("email")}</td>
                    <td>{service.PublicEmail}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {service.Geocodes !== null && (
              <div className="map">
                <div className="sectionTitle">
                  <span>{t("map")}</span>
                </div>
                <div className="mapContainer">
                  <Map positions={service.Geocodes} />
                </div>
              </div>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;
