import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [bookingQuotes, setBookingQuotes] = useState();

  bodyRequest.request.Language = `${language}-JP`;
  quoteRequest.Language = `${language}`;
  quoteRequest.Configurations[0].ProductId = `${language}`;

  bodyRequest.request.Filter.Ids = [id];

  useEffect(() => {
    bodyRequest.request.Output.Children = {
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
      .post(endpoints.search, bodyRequest, { headers: headers })
      .then((response) => {
        setService(response.data.Entities[0]);
      });
  }, [searchParams, location]);

  const getQuote = (values) => {
    quoteRequest.Configurations[0].Pax.Adults = parseInt(values.pax);
    quoteRequest.CommencementDate = new Date(values.date);
    quoteRequest.Duration = parseInt(values.duration);
    if (service && service.Children.length > 0) {
      service.Children.map((children) => {
        quoteRequest.Configurations[0].ProductId = children.Id;
        axios
          .post(endpoints.bookingQuote, quoteRequest, { headers: headers })
          .then((response) => {
            setBookingQuotes(response.data);
            console.log(bookingQuotes);
          });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      date: e.target[0].value,
      pax: e.target[1].value,
      duration: e.target[2].value,
    };
    getQuote(values);
  };

  function getServiceType() {
    let serviceType = "Accomodation";
    if (service) {
      switch (service.Type) {
        case 0:
          serviceType = t("accomodation");
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
          return t("accomodation");
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
                        <img src={service.Url} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <img src={DefaultImg} />
              )}
            </div>
            <div className="checkPrice mb-4">
              <h4>Check Price & Availability</h4>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <Form.Control
                      className="me-2"
                      type="date"
                      defaultValue={date}
                      min={disablePastDate()}
                    />
                    <Form.Control className="me-2" value="1" type="number" />
                    <Form.Control className="me-2" value="2" type="number" />
                  </div>
                  <div>
                    <Button type="submit" variant="secondary">
                      {t("search")}
                    </Button>
                  </div>
                </div>
              </form>
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
                    <td>{service.Website}</td>
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
