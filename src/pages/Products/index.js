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

import headerImg from '../../assets/images/hedImg.webp';
import "./style.scss";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [language] = useOutletContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    {
      value: "Rate-Ascending",
      label: t('rate_ascending'),
    },
    {
      value: "Rate-Descending",
      label: t('rate_descending'),
    },
    {
      value: "Name-Ascending",
      label: t('name_ascending'),
    },
    {
      value: "Name-Descending",
      label: t('name_descending'),
    },
  ];

  const [quickBooking, setQuickBooking] = useState([]);
  const [onRequest, setOnRequest] = useState([]);
  const [stateMap, setStateMap] = useState([]);
  const [services, setServices] = useState([]);
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
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState();
  const [keyword, setKeyword] = useState();
  const [typeShop, setTypeShop] = useState();

  const [pageName, setPageName] = useState('search_page');
  const [breadcrumbName, setBreadcrumbName] = useState('all_breadcrumb');

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
    stateButton === 'quick' ? setServices(quickBooking) : setServices(onRequest)
  }, [quickBooking, onRequest])

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
    const sort = searchParams.get("sort");

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

    if (sort) {
      setSelectedOption(sort);
      productsRequest.request.Sorting = [
        {
          By: `${sort.split("-")[0]}`,
          Direction: `${sort.split("-")[1]}`,
        },
      ];
    } else {
      productsRequest.request.Sorting = [
        {
          By: "Rate",
          Direction: "Ascending",
          PositionOfNull: "PreferenceBottom",
        },
      ];
    }

    delete productsRequest.request.Filter.Ids;

    getData();
  }, []);

  useEffect(() => {
    stateMap &&
      stateMap.map((item) => {
        if (item.HasGeocodes) {
          setGeocodes(true);
        }
      });
  }, [stateMap]);

  const dispatchQuick = (page) => {
    productsRequest.request.ShortName = distributorQuick;
    productsRequest.request.Paging.PageNumber = page || 1;
    productsRequest.request.Paging.PageSize = 12;

    axios.post(endpoints.search, productsRequest).then((response) => {
      if (page && page > 1) {
        setServices((data) => [...data, ...response.data.Entities]);
        setQuickBooking((data) => [...data, ...response.data.Entities]);
      } else {
        setQuickBooking(response.data.Entities);
        setServices(response.data.Entities);
        setTotalPage(response.data.Paging.NumberOfPages);
      }
      if (response.data.Paging.NumberOfPages <= 1 || page === response.data.Paging.NumberOfPages) {
        dispatchQuick2();
      }
      setProductsShow("block");
      setSkeletonShow("none");
    });
  };
  const dispatchQuick2 = () => {
    productsRequest.request.ShortName = 'shinkibusco_2';
    productsRequest.request.Paging.PageNumber = 1;
    productsRequest.request.Paging.PageSize = 12;

    setProductsShow("none");
    setSkeletonShow("block");

    const category = searchParams.get("category");

    if (!category || category === 'all') {
      productsRequest.request.Filter.TagCriteria = {
        IndustryCategoryGroups: [0, 1, 2],
      }
    }

    axios.post(endpoints.search, productsRequest).then((response) => {
      let newResponse = response.data.Entities.map((item) => ({ ...item, secondDist: true }));

      setQuickBooking((qb) => [...qb, ...newResponse]);
      setServices((data) => [...data, ...newResponse]);

      setProductsShow("block");
      setSkeletonShow("none");
    });
  }

  const dispatchRequest = (pageRequest) => {
    productsRequest.request.ShortName = distributorRequest;
    productsRequest.request.Paging.PageNumber = 1;
    productsRequest.request.Paging.PageSize = 12;

    axios.post(endpoints.search, productsRequest).then((response) => {
      if (pageRequest && pageRequest > 1) {
        setServices((data) => [...data, ...response.data.Entities]);
        setOnRequest((data) => [...data, ...response.data.Entities]);
        setSkeletonShow("none");
      } else {
        setOnRequest(response.data.Entities);
        setTotalPageOnRequest(response.data.Paging.NumberOfPages);
      }
    });
  };

  const updateStateMap = (data) => {
    setStateMap((ss) => [
      ...ss,
      ...data,
    ]);
  }
  const dispatchMap = () => {
    productsRequest.request.Paging = {};
    productsRequest.request.ShortName = distributorQuick;

    axios.post(endpoints.search, productsRequest).then((response) => {
      updateStateMap(response.data.Entities);
      dispatchMap2();
    });
  }

  const dispatchMap2 = () => {
    productsRequest.request.ShortName = 'shinkibusco_2';
    productsRequest.request.Paging = {};

    axios.post(endpoints.search, productsRequest).then((response) => {
      updateStateMap(response.data.Entities);
    });
  }

  const dispatchMapOnRequest = () => {
    productsRequest.request.Paging = {};
    productsRequest.request.ShortName = distributorRequest;

    axios.post(endpoints.search, productsRequest).then((response) => {
      updateStateMap(response.data.Entities);
    });
  }

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

    dispatchMap();
    dispatchMapOnRequest();
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
      productsRequest.request.Filter.TagCriteria = {
        IndustryCategoryGroups: [0, 1, 2],
      };
      searchParams.delete("category");
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
    pageNames();

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
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    getData();
  };

  const goToDetail = (id, onReq, secondDist) => {
    navigate(`/product?id=${id}&on_req=${onReq}&second_dist=${secondDist}`);
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

  const pageNames = () => {
    let name = '';
    let breadcrumb = ''
    const category = searchParams.get('category');
    switch (category) {
      case 'all':
        name = 'search_page';
        breadcrumb = 'all_breadcrumb'
        break;
      case '0':
        name = 'accommodation';
        breadcrumb = 'accommodation'
        break;
      case '1':
        name = 'activity';
        breadcrumb = 'activity'
        break;
      case '2':
        name = 'restaurant';
        breadcrumb = 'restaurant'
        break;
      case '3':
        name = 'shopping';
        breadcrumb = 'shopping'
        break;
      default:
        name = 'search_page';
        breadcrumb = 'all_breadcrumb';
        break;
    }

    setPageName(name);
    setBreadcrumbName(breadcrumb);
  }

  return (
    <div className="products">
      <div className="header">
        <div className="container-fluid">
          <img src={headerImg} />
          <div className="text">{t(pageName)}</div>
        </div>
      </div>
      <div className="container">
        <div className="productsWrapper" style={{ display: productsShow }}>
          <p id="breadcrumbs"><span><span><a href="https://local-prime.com/">{t('home')}</a> » <span className="breadcrumb_last" aria-current="page">{t(breadcrumbName)}</span></span></span></p>
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
                className="me-2 me-lg-3"
              >
                {t("quick_booking")}
              </Button>
              <Button
                variant={stateButton === "request" ? "primary" : "secondary"}
                onClick={() => changeToRequest()}
                className="me-2 me-lg-3"
              >
                {t("request_book")}
              </Button>
              <Button
                variant={stateButton === "map" ? "primary" : "secondary"}
                onClick={() => changeToMap()}
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
            {geocodes && stateMap.length > 0 && (
              <Map positions={stateMap} zoom={9} />
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
