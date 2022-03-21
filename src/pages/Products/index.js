import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { bodyRequest, headers } from "../../helpers/utils";
import { endpoints } from "../../helpers/endpoints";
import SkeletonProducts from "./components/SkeletonProducts";
import Filter from "../../components/Filter";

import "./style.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Items from "./components/Items";

const Products = () => {
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

  const [services, setServices] = useState([]);
  const [stateServices, setStateServices] = useState([]);
  const [skeletonShow, setSkeletonShow] = useState("none");
  const [productsShow, setProductsShow] = useState("block");
  const [stateButton, setStateButton] = useState("primary");
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [language] = useOutletContext();
  // const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const productsRequest = bodyRequest;

  productsRequest.request.Language = `${language}-JP`;

  useEffect(() => {
    searchParams.delete("pages");
    setSearchParams(searchParams);

    setPage(1);
    productsRequest.request.Paging.PageNumber = 1;
  }, []);

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
  }, [language]);

  const getData = (page) => {
    setSkeletonShow("block");

    productsRequest.request.Availability = {
      MergeMethod: 1,
      Window: {
        Size: 42,
        StartDate: new Date(),
      },
    };

    if (page && page > 1) {
      productsRequest.request.Paging.PageNumber = page;
      searchParams.get("page", page);
    } else {
      setProductsShow("none");
    }

    axios
      .post(endpoints.search, productsRequest, { headers: headers })
      .then((response) => {
        if (page && page > 1) {
          setServices((data) => [...data, ...response.data.Entities]);
          setStateServices((stateServices) => [
            ...stateServices,
            ...response.data.Entities,
          ]);
        } else {
          setServices(response.data.Entities);
          setStateServices(response.data.Entities);
          setTotalPage(response.data.Paging.NumberOfPages);
          setProductsShow("block");
        }
        setSkeletonShow("none");
      });
  };

  const filterData = (values) => {
    if (values.minRange) {
      if (values.minRange === "0") {
        productsRequest.request.Filter.Bookability.RateRange = {};
        searchParams.delete("min");
        searchParams.delete("max");
      } else {
        productsRequest.request.Filter.Bookability.RateRange = {
          Min: values.minRange,
          Max: values.maxRange,
        };
        searchParams.set("min", values.minRange);
        searchParams.set("max", values.maxRange);
      }
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

  const changeToRequest = () => {
    const requestBook = stateServices.filter((service) => {
      return service.OnRequestOnly === true;
    });

    setServices(requestBook);
    setStateButton(false);
  };

  const changeToQuick = () => {
    const quickBook = stateServices.filter((service) => {
      return service.OnRequestOnly === false;
    });

    setServices(quickBook);
    setStateButton(true);
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

  const goToDetail = (id, onReq) => {
    navigate(`/product?id=${id}&on_req=${onReq}`);
  };

  const loadMore = () => {
    const paging = page + 1;

    searchParams.set("pages", paging);
    setSearchParams(searchParams);

    setPage(paging);
    getData(paging);
  };

  return (
    <div className="container products">
      <div className="productsWrapper" style={{ display: productsShow }}>
        <div className="titlePage">{t("search")}</div>
        <Filter lang={language} filter={filterData} />
        <div className="d-flex justify-content-between productsOption mb-4">
          <div>
            <Button
              variant={stateButton ? "primary" : "secondary"}
              onClick={() => changeToQuick()}
              className="me-3 fw-bold"
            >
              {t("quick_booking")}
            </Button>
            <Button
              variant={stateButton ? "secondary" : "primary"}
              onClick={() => changeToRequest()}
              className="fw-bold"
            >
              {t("request_book")}
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
          <Items
            services={services}
            goToDetail={goToDetail}
            loadMore={loadMore}
            totalPage={totalPage}
            currentPage={page}
          />
        </div>
      </div>

      <div className="skeletonWrapper" style={{ display: skeletonShow }}>
        <SkeletonProducts />
      </div>
    </div>
  );
};

export default Products;
