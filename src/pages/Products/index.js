import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  bodyRequest,
  distributorQuick,
  distributorRequest,
} from "../../helpers/utils";
import { endpoints } from "../../helpers/endpoints";
import SkeletonProducts from "./components/SkeletonProducts";
import Filter from "./components/Filter";
import Map from "../../components/Maps";
import Items from "./components/Items";

import "./style.scss";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [language] = useOutletContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    {
      value: "Name-Ascending",
      label: t('name_ascending'),
    },
    {
      value: "Name-Descending",
      label: t('name_descending'),
    },
    {
      value: "Rate-Ascending",
      label: t('rate_ascending'),
    },
    {
      value: "Rate-Descending",
      label: t('rate_descending'),
    },
  ];

  const [quickBooking, setQuickBooking] = useState([]);
  const [onRequest, setOnRequest] = useState([]);
  const [services, setServices] = useState([]);
  const [stateServices, setStateServices] = useState([]);
  const [geocodes, setGeocodes] = useState(false);

  const [skeletonShow, setSkeletonShow] = useState("none");
  const [productsShow, setProductsShow] = useState("block");
  const [stateButton, setStateButton] = useState("quick");

  const [page, setPage] = useState(1);
  const [pageRequest, setPageRequest] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalPageOnRequest, setTotalPageOnRequest] = useState(1);

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const [category, setCategory] = useState('all');
  const [date, setDate] = useState(new Date());
  const [priceRange, setPriceRange] = useState();
  const [keyword, setKeyword] = useState();
  const [typeShop, setTypeShop] = useState();

  const productsRequest = bodyRequest;

  productsRequest.request.Language = `${language}-JP`;

  useEffect(() => {
    searchParams.delete("pages");
    searchParams.delete("pages_request");
    setSearchParams(searchParams);

    setPage(1);
    productsRequest.request.Paging.PageNumber = 1;
  }, []);

  useEffect(() => {
    productsRequest.request.Availability = {
      MergeMethod: 1,
      Window: {
        Size: 42,
        StartDate: new Date(),
      },
    };

    const category = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const keyword = searchParams.get("keyword");
    const date = searchParams.get("date");

    if (category && category !== "all") {
      productsRequest.request.Filter.TagCriteria = {
        IndustryCategoryGroups: [category],
      };
      setCategory(category);
    }

    if (min || max) {
      productsRequest.request.Filter.Bookability.RateRange = {
        Min: min,
        Max: max,
      };
      setPriceRange(`${min}-${max}`)
    }

    if (date) {
      productsRequest.request.Availability.Window.StartDate = new Date(date);
      setDate(new Date(date));
    }

    if (keyword) {
      productsRequest.request.Filter.Names = [`%${keyword}%`];
      setKeyword(keyword)
    }

    delete productsRequest.request.Filter.Ids;

    productsRequest.request.Sorting = [
      {
        By: "Name",
        Direction: "Ascending",
        PositionOfNull: "PreferenceBottom",
      },
    ];
    getData();
  }, []);

  useEffect(() => {
    stateServices &&
      stateServices.map((item) => {
        if (item.HasGeocodes) {
          setGeocodes(true);
        }
      });
  }, [stateServices]);

  useEffect(() => {
    stateButton === 'quick' ? setServices(quickBooking) : setServices(onRequest)
  }, [quickBooking, onRequest])

  const dispatchQuick = (page) => {
    productsRequest.request.ShortName = distributorQuick;

    axios.post(endpoints.search, productsRequest).then((response) => {
      if (page && page > 1) {
        setServices((data) => [...data, ...response.data.Entities]);
        setQuickBooking((data) => [...data, ...response.data.Entities]);
        setStateServices((stateServices) => [
          ...stateServices,
          ...response.data.Entities,
        ]);
      } else {
        setQuickBooking(response.data.Entities);
        setServices(response.data.Entities);
        setStateServices((stateServices) => [
          ...stateServices,
          ...response.data.Entities,
        ]);
        setTotalPage(response.data.Paging.NumberOfPages);
      }
      setProductsShow("block");
      setSkeletonShow("none");
    });
  };

  const dispatchRequest = (pageRequest) => {
    productsRequest.request.ShortName = distributorRequest;

    axios.post(endpoints.search, productsRequest).then((response) => {
      if (pageRequest && pageRequest > 1) {
        setServices((data) => [...data, ...response.data.Entities]);
        setOnRequest((data) => [...data, ...response.data.Entities]);
        setStateServices((stateServices) => [
          ...stateServices,
          ...response.data.Entities,
        ]);
        setSkeletonShow("none");
      } else {
        setOnRequest(response.data.Entities);
        setStateServices((stateServices) => [
          ...stateServices,
          ...response.data.Entities,
        ]);
        setTotalPageOnRequest(response.data.Paging.NumberOfPages);
      }
    });
  };

  const getData = (payload) => {
    setSkeletonShow("block");

    if (payload?.page && payload?.page > 1) {
      productsRequest.request.Paging.PageNumber = payload?.page;
      searchParams.get("page", page);
      dispatchQuick(payload?.page);
    } else if (payload?.pageRequest && payload?.pageRequest > 1) {
      productsRequest.request.Paging.PageNumber = payload?.pageRequest;
      dispatchRequest(payload?.pageRequest);
    } else {
      setProductsShow("none");
      productsRequest.request.Paging.PageNumber = 1;
      dispatchQuick();
      dispatchRequest();
    }
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
      productsRequest.request.Availability.Window.StartDate = new Date(values.date);
      searchParams.set("date", new Date(values.date));
    }

    if (values.category === "all") {
      delete productsRequest.request.Filter.TagCriteria;
      searchParams.set("category", "all");
    } else {
      productsRequest.request.Filter.TagCriteria = {
        IndustryCategoryGroups: [values.category],
      };
      searchParams.set("category", values.category);
    }

    if (values.keyword) {
      productsRequest.request.Filter.Names = [`%${values.keyword}%`];
      searchParams.set("keyword", values.keyword);
    } else {
      delete productsRequest.request.Filter.Names;
      searchParams.delete("keyword");
    }

    setSearchParams(searchParams);

    getData();
  };

  const changeToRequest = () => {
    setServices(onRequest);
    setStateButton("request");
  };

  const changeToQuick = () => {
    setServices(quickBooking);
    setStateButton("quick");
  };

  const changeToMap = () => {
    setStateButton("map");
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
    if (stateButton === "quick") {
      const paging = page + 1;
      searchParams.set("pages", paging);
      searchParams.delete("pages_request");
      setSearchParams(searchParams);

      setPage(paging);
      getData({ page: paging });
    } else if (stateButton === "request") {
      const paging = pageRequest + 1;
      searchParams.delete("pages");
      searchParams.set("pages_request", paging);
      setSearchParams(searchParams);

      setPageRequest(paging);
      getData({ pageRequest: paging });
    }
  };

  const resetFilter = () => {
    setCategory('all');
    setDate('');
    setKeyword('');
    setPriceRange('0-');

    productsRequest.request.Filter.Bookability.RateRange = {};
    productsRequest.request.Availability.Window.StartDate = new Date();
    delete productsRequest.request.Filter.Names;
    delete productsRequest.request.Filter.TagCriteria;

    getData();
  }

  return (
    <div className="products">
      <div className="floatingText">
        <div className="text">{t("booking")}</div>
      </div>
      <div className="container">
        <div className="productsWrapper" style={{ display: productsShow }}>
          <div className="titlePage">{t("search")}</div>
          <div className="reset" onClick={() => resetFilter()}>{t('reset_filter')}</div>
          <Filter
            lang={language}
            filter={filterData}
            date={date}
            category={category}
            priceRange={priceRange}
            keyword={keyword}
            typeShop={typeShop}
            setDate={setDate}
            setCategory={setCategory}
            setPriceRange={setPriceRange}
            setTypeShop={setTypeShop}
            setKeyword={setKeyword}
          />
          <div className="d-flex flex-wrap justify-content-between productsOption mb-4">
            <div className="mb-3 mb-lg-0">
              <Button
                variant={stateButton === "quick" ? "primary" : "secondary"}
                onClick={() => changeToQuick()}
                className="me-2 me-lg-3 fw-bold"
              >
                {t("quick_booking")}
              </Button>
              <Button
                variant={stateButton === "request" ? "primary" : "secondary"}
                onClick={() => changeToRequest()}
                className="fw-bold me-2 me-lg-3"
              >
                {t("request_book")}
              </Button>
              <Button
                variant={stateButton === "map" ? "primary" : "secondary"}
                onClick={() => changeToMap()}
                className="fw-bold"
              >
                {t("map")}
              </Button>
            </div>
            <div className="d-flex sort">
              <div className="text">{t('sort_by')}:</div>
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
          <div
            className="productItems"
            style={{ display: stateButton !== 'map' ? "block" : "none" }}
          >
            <Items
              services={services}
              goToDetail={goToDetail}
              loadMore={loadMore}
              totalPage={totalPage}
              currentPage={page}
              currentPageOnRequest={pageRequest}
              totalPageOnRequest={totalPageOnRequest}
              state={stateButton}
            />
          </div>
          <div
            className="productsMap"
            style={{ display: stateButton === 'map' ? "block" : "none" }}
          >
            {geocodes && stateServices.length > 0 && (
              <Map positions={stateServices} zoom={9} />
            )}
          </div>
        </div>

        <div className="skeletonWrapper" style={{ display: skeletonShow }}>
          <SkeletonProducts currentPage={page} />
        </div>
      </div>
    </div>
  );
};

export default Products;
