import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { disablePastDate } from "../../../../helpers/utils";

import "./style.scss";

const propTypes = {
  filter: PropTypes.func,
  selectedCategory: PropTypes.string,
};

const Filter = ({ filter, selectedCategory }) => {
  const { t } = useTranslation();

  const [category, setCategory] = useState();

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      date: event.target[0].value ? new Date(event.target[0].value) : null,
      category: category,
      minRange: event.target[2].value.includes("-")
        ? event.target[2].value.split("-")[0]
        : null,
      maxRange:
        event.target[2].value.split("-")[1] &&
        event.target[2].value.includes("-")
          ? event.target[2].value.split("-")[1]
          : null,
      keyword: event.target[3].value,
    };
    filter(data);
  };

  return (
    <div className="filterWrapper">
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Control
              type="date"
              min={disablePastDate()}
              name="date"
              placeholder="Date"
            />
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
            <Form.Select type="text">
              <option value="0-">{t("price_range")}</option>
              <option value="1-9999">{"< ¥9.999"}</option>
              <option value="10000-14999">{"¥10.000 - ¥14.999"}</option>
              <option value="15000-19999">{"¥15.000 - ¥19.999"}</option>
              <option value="20000-">¥20.000 +</option>
            </Form.Select>
          </Col>
          <Col xs={6} className="col-lg mb-3 mb-lg-0">
            <Form.Control
              type="text"
              name="keyword"
              placeholder={t("keyword")}
            />
          </Col>
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
