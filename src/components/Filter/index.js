import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./style.scss";

const Filter = () => {
  const { t } = useTranslation();

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div className="filterWrapper">
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
            <option>{t("all_categories")}</option>
            <option value="accomodation">{t("accommodation")}</option>
            <option value="activity">{t("activity")}</option>
            <option value="restaurant">{t("restaurant")}</option>
            <option value="produce">{t("produce")}</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select type="text">
            <option>{t("price_range")}</option>
            <option>{"< ¥9.999"}</option>
            <option>{"¥10.000 - ¥14.999"}</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control type="text" placeholder={t("keyword")} />
        </Col>
        <Col>
          <Button className="w-100" variant="secondary">
            {t("search")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
