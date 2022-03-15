import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { disablePastDate } from "../../helpers/utils";

import "./style.scss";

const propTypes = {
  filter: PropTypes.func,
};

const Filter = ({ filter }) => {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      date: event.target[0].value ? new Date(event.target[0].value) : null,
      category: event.target[1].value,
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
          <Col>
            <Form.Control
              type="date"
              min={disablePastDate()}
              name="date"
              placeholder="Date"
            />
          </Col>
          <Col>
            <Form.Select>
              <option value="all">{t("all_categories")}</option>
              <option value="0">{t("accommodation")}</option>
              <option value="1">{t("activity")}</option>
              <option value="2">{t("restaurant")}</option>
              <option value="3">{t("produce")}</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select type="text">
              <option>{t("price_range")}</option>
              <option value="1-9999">{"< ¥9.999"}</option>
              <option value="10000-14999">{"¥10.000 - ¥14.999"}</option>
              <option value="15000-19999">{"¥15.000 - ¥19.999"}</option>
              <option value="20000-">¥20.000 +</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="keyword"
              placeholder={t("keyword")}
            />
          </Col>
          <Col>
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
