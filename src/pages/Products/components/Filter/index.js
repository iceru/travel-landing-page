import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';
import "./style.scss";
import moment from "moment";

const propTypes = {
  filter: PropTypes.func,
  selectedCategory: PropTypes.string,
  setCategory: PropTypes.func,
  setDate: PropTypes.func,
  setTypeShop: PropTypes.func,
  setKeyword: PropTypes.func,
  setPriceRange: PropTypes.func,
  category: PropTypes.string,
  date: PropTypes.date,
  typeShop: PropTypes.string,
  keyword: PropTypes.string,
  priceRange: PropTypes.string,
};

const Filter = ({ filter, priceRange, setPriceRange, setCategory, category, setDate, date, setKeyword, keyword, setTypeShop, typeShop }) => {
  const { t } = useTranslation();

  const [showCalendar, setShowCalendar] = useState(false);

  const onChange = (date) => {
    setDate(date);
    setShowCalendar(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      date: event.target[0].value ? new Date(event.target[0].value) : null,
      category: category,
      minRange: priceRange?.includes("-")
        ? priceRange?.split("-")[0]
        : null,
      maxRange:
        priceRange?.split("-")[1] &&
          priceRange?.includes("-")
          ? priceRange?.split("-")[1]
          : null,
      keyword: category !== "3" ? keyword : null,
      typeShop: category === "3" ? typeShop : null,
    };
    setShowCalendar(false);
    filter(data);
  };

  const minDate = () => {
    var someDate = new Date();
    var numberOfDaysToAdd = 2;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    return new Date(result)
  }

  return (
    <div className="filterWrapper">
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Control
              type="input"
              name="date"
              placeholder={t('date_placeholder')}
              readOnly
              value={date && moment(date).format('LL')}
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <Calendar minDate={minDate()} onChange={(date) => onChange(date)} value={date} className={!showCalendar ? "hide" : ""} />
          </Col>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="all">{t("all_categories")}</option>
              <option value="0">{t("accommodation")}</option>
              <option value="1">{t("activity")}</option>
              <option value="2">{t("restaurant")}</option>
              <option value="3">{t("produce")}</option>
            </Form.Select>
          </Col>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Select type="text" name="price_range" onChange={((e) => setPriceRange(e.target.value))} value={priceRange}>
              <option value="0-">{t("price_range")}</option>
              <option value="1-9999">{"< ¥9.999"}</option>
              <option value="10000-14999">{"¥10.000 - ¥14.999"}</option>
              <option value="15000-19999">{"¥15.000 - ¥19.999"}</option>
              <option value="20000-">¥20.000 +</option>
            </Form.Select>
          </Col>
          {category !== "3" ? (
            <Col xs={6} className="col-lg mb-3 mb-lg-0">
              <Form.Control
                type="text"
                name="keyword"
                onChange={((e) => setKeyword(e.target.value))}
                placeholder={t("keyword")}
                value={keyword}
              />
            </Col>
          ) : (
            <Col xs={6} className="col-lg mb-3 mb-lg-0">
              <Form.Select type="text" name="category_shop" onChange={((e) => setTypeShop(e.target.value))} value={typeShop}>
                <option value="all-shop">All Categories</option>
              </Form.Select>
            </Col>
          )}
          <Col xs={12} className="col-lg mb-3 mb-lg-0">
            <Button className="w-100" variant="secondary" type="submit">
              {t("search")}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

Filter.propTypes = propTypes;

export default Filter;
