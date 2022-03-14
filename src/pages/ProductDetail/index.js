import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import { bodyRequest, headers } from "../../helpers/utils";
import DefaultImg from "../../assets/images/no_image.png";
import { endpoints } from "../../helpers/endpoints";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./style.scss";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [language] = useOutletContext();
  const { t } = useTranslation();

  const [service, setService] = useState();

  bodyRequest.Language = `${language}-JP`;
  bodyRequest.Filter.Ids = [id];
  useEffect(() => {
    axios
      .post(endpoints.search, bodyRequest, { headers: headers })
      .then((response) => {
        setService(response.data.Entities[0]);
      });
  }, [searchParams]);

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
            <div className="carousel mb-4">
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
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <Form.Control className="me-2" type="date" />
                  <Form.Control className="me-2" value="1" type="number" />
                  <Form.Control className="me-2" value="2" type="number" />
                </div>
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => console.log("Search")}
                  >
                    {t("search")}
                  </Button>
                </div>
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
                    <td>{service.Website}</td>
                  </tr>
                  <tr>
                    <td>{t("email")}</td>
                    <td>{service.PublicEmail}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="map">
              <div className="sectionTitle">
                <span>{t("map")}</span>
              </div>
              <div className="mapContainer"></div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;
