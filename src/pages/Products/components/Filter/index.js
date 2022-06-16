import React, { useState, useEffect } from "react";
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
};

const Filter = ({ filter, selectedCategory }) => {
  const { t } = useTranslation();

  const [category, setCategory] = useState();
  const [priceRange, setPriceRange] = useState();
  const [keyword, setKeyword] = useState();
  const [typeShop, setTypeShop] = useState();
  const [value, setValue] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

  const onChange = (value) => {
    setValue(value);
    setShowCalendar(false);
  }

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

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
              value={value && moment(value).format('LL')}
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <Calendar minDate={minDate()} onChange={(value) => onChange(value)} value={value} className={!showCalendar ? "hide" : ""} />
            <small className="clearDate mt-1" onClick={() => setValue('')}>
              <a href="#">{t('clear_date')}</a>
            </small>
          </Col>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Select
              onChange={(event) => setCategory(event.target.value)}
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
            <Form.Select type="text" name="price_range" onChange={((e) => setPriceRange(e.target.value))}>
              <option value="0-">{t("price_range")}</option>
              <option value="1-9999">{"~ 9.999円"}</option>
              <option value="10000-14999">{"10.000円 ~ 14.999円"}</option>
              <option value="15000-19999">{"15.000円 ~ 19.999円"}</option>
              <option value="20000-">20.000円 ~</option>
            </Form.Select>
          </Col>
          {category !== "3" ? (
            <Col xs={6} className="col-lg mb-3 mb-lg-0">
              <Form.Control
                type="text"
                name="keyword"
                placeholder={t("keyword")}
                onChange={((e) => setKeyword(e.target.value))}
              />
            </Col>
          ) : (
            <Col xs={6} className="col-lg mb-3 mb-lg-0">
              <Form.Select type="text" name="category_shop" onChange={((e) => setTypeShop(e.target.value))}>
                <option value="all-shop">{t('all_categories_shop')}</option>
              </Form.Select>
            </Col>
          )}
          <Col xs={12} className="col-lg mb-3 mb-lg-0">
            <Button className="w-100" variant="primary" type="submit">
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
