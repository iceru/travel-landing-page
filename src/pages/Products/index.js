import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { bodyRequest, headers } from "../../helpers/utils";
import { endpoints } from "../../helpers/endpoints";

import Filter from "../../components/Filter";
import DefaultImg from "../../assets/images/no_image.png";

import "./style.scss";

const Products = () => {
  const [services, setServices] = useState(null);
  const [language] = useOutletContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  bodyRequest.Language = `${language}-JP`;

  useEffect(() => {
    axios
      .post(endpoints.search, bodyRequest, { headers: headers })
      .then((response) => {
        setServices(response.data);
        console.log(services.Entities);
      });
  }, [language]);

  const goToDetail = (id) => {
    navigate(`/product?id=${id}`);
  };

  return (
    <div className="container products">
      <div className="titlePage">{t("search")}</div>
      <Filter lang={language} />
      <div className="d-flex justify-content-between productsOption mb-4">
        <div>Rate</div>
        <div className="d-flex sort">
          <div className="text">Sort by:</div>
          <Form.Select>
            <option>Name</option>
            <option>Price</option>
          </Form.Select>
        </div>
      </div>
      <div className="productItems">
        <Row>
          {services && services.Entities ? (
            services.Entities.map((service, i) => {
              return (
                <Col xs={12} lg={4} key={i}>
                  <div className="item">
                    <div className="image">
                      <img
                        src={
                          service.Images !== null
                            ? service.Images[0].Url
                            : DefaultImg
                        }
                        alt="title"
                      />
                    </div>
                    <div className="title">{service.Name}</div>
                    <div className="address">
                      {service.PhysicalAddress.Line1},{" "}
                      {service.PhysicalAddress.City},{" "}
                      {service.PhysicalAddress.PostCode}
                    </div>
                    <div className="price">
                      From ¥{service.Availability.Calendar.LowestRate}
                    </div>
                    <div className="desc">{service.LongDescription}</div>
                    <div className="buttonWrapper">
                      <Button
                        className="w-100"
                        variant="primary"
                        onClick={() => goToDetail(service.Id)}
                      >
                        {t("view_details")}
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <h3>{t("not_found")}</h3>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Products;
