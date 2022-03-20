import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { bodyRequest, headers } from "../../helpers/utils";
import { endpoints } from "../../helpers/endpoints";
import SkeletonProducts from "./components/SkeletonProducts";
import Filter from "../../components/Filter";

import DefaultImg from "../../assets/images/no_image.png";

import "./style.scss";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [services, setServices] = useState(null);
  const [stateServices, setStateServices] = useState(null);
  const [skeletonShow, setSkeletonShow] = useState("none");
  const [productsShow, setProductsShow] = useState("block");
  const [stateButton, setStateButton] = useState("primary");

  const [language] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const productsRequest = bodyRequest;

  const options = [
    {
      value: "Name-Ascending",
      label: "Name - Ascending",
    },
    {
      value: "Name-Descending",
      label: "Name - Descending",
    },
    {
      value: "Rate-Ascending",
      label: "Rate - Ascending",
    },
    {
      value: "Rate-Descending",
      label: "Rate - Descending",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  productsRequest.request.Language = `${language}-JP`;
  console.log(services);

  const changeToRequest = () => {
    const requestBook = stateServices.filter((service) => {
      return service.OnRequestOnly === true
    })

    setServices(requestBook);
    setStateButton(false);
  }

  const changeToQuick = () => {
    const quickBook = stateServices.filter((service) => {
      return service.OnRequestOnly === false
    })

    setServices(quickBook);
    setStateButton(true);
  }

  const getData = () => {
    setSkeletonShow("block");
    setProductsShow("none");

    productsRequest.request.Availability = {
      MergeMethod: 1,
      Window: {
        Size: 42,
        StartDate: new Date(),
      },
    };

    axios
      .post(endpoints.search, productsRequest, { headers: headers })
      .then((response) => {
        setServices(response.data.Entities);
        setStateServices(response.data.Entities);
        setSkeletonShow("none");
        setProductsShow("block");
      });
  };

  const filterData = (values) => {
    if (values.minRange) {
      productsRequest.request.Filter.Bookability.RateRange = {
        Min: values.minRange,
        Max: values.maxRange,
      };
      searchParams.set("min", values.minRange);
      searchParams.set("max", values.maxRange);
    }

    if (values.date) {
      productsRequest.request.Availability.Window.StartDate = values.date;
      searchParams.set("date", values.date);
    }

    if (values.category === "all") {
      delete productsRequest.request.Filter.TagCriteria;
    } else {
      productsRequest.request.Filter.TagCriteria = {
        IndustryCategoryGroups: [values.category],
      };
      searchParams.set("category", values.category);
    }

    if (values.keyword) {
      productsRequest.request.Filter.Names = [values.keyword];
      searchParams.set("keyword", values.keyword);
    } else {
      delete productsRequest.request.Filter.Names;
    }

    setSearchParams(searchParams);

    getData();
  };

  const onSort = (value) => {
    setSelectedOption(value);
    productsRequest.request.Sorting = [
      {
        By: `${value.split("-")[0]}`,
        Direction: `${value.split("-")[1]}`,
      },
    ];
    getData();
  };

  useEffect(() => {
    delete productsRequest.request.Filter.Ids;

    productsRequest.request.Sorting = [
      {
        By: "Name",
        Direction: "Ascending",
        PositionOfNull: "PreferenceBottom",
      },
    ];
    getData();
  }, [language, location]);

  const goToDetail = (id, onReq) => {
    navigate(`/product?id=${id}&on_req=${onReq}`);
  };

  return (
    <div className="container products">
      <div className="skeletonWrapper" style={{ display: skeletonShow }}>
        <SkeletonProducts />
      </div>

      <div className="productsWrapper" style={{ display: productsShow }}>
        <div className="titlePage">{t("search")}</div>
        <Filter lang={language} filter={filterData} />
        <div className="d-flex justify-content-between productsOption mb-4">
          <div>
            <Button variant={stateButton ? "primary" : "secondary"} onClick={() => changeToQuick()} className="me-3 fw-bold">
              {t('quick_booking')}
            </Button>
            <Button variant={stateButton ? "secondary" : "primary"} onClick={() => changeToRequest()} className="fw-bold">
              {t('request_book')}
            </Button>
          </div>
          <div className="d-flex sort">
            <div className="text">Sort by:</div>
            <Form.Select
              value={selectedOption}
              onChange={(e) => onSort(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="productItems">
          <Row>
            {services && services.length > 0 ? (
              services.map((service, i) => {
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
                          alt={service.Name}
                        />
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToDetail(service.Id);
                        }}
                      >
                        <div className="title">{service.Name}</div>
                      </a>

                      <div className="address">
                        {service.PhysicalAddress.Line1},{" "}
                        {service.PhysicalAddress.City},{" "}
                        {service.PhysicalAddress.PostCode}
                      </div>
                      <div className="price">
                        {service.Availability.Calendar.LowestRate &&
                          `From ¥ ${service.Availability.Calendar.LowestRate}`}
                      </div>
                      <div className="desc">{service.LongDescription}</div>
                      <div className="buttonWrapper">
                        <Button
                          className="w-100"
                          variant="primary"
                          onClick={() =>
                            goToDetail(service.Id, service.OnRequestOnly)
                          }
                        >
                          {t("view_details")}
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <h3 className="text-center">{t("not_found")}</h3>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Products;
