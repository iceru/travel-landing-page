import React from "react";

import { Table, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { countries } from "../../helpers/countries";

const RequestBook = () => {
  const { t } = useTranslation();
  return (
    <div className="rbWrapper container">
      <div className="rbTitle">Title Book</div>
      <Table bordered responsive className="mb-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Options/Costs</th>
            <th>Totals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Pax Options</th>
            <th>Price Total</th>
          </tr>
          <tr>
            <th colSpan={2}>Total</th>
            <th>8000</th>
          </tr>
        </tbody>
      </Table>

      <div className="notes mb-5">
        <Form.Group className="mb-3">
          <Form.Label>{t("special_request")}</Form.Label>
          <Form.Control type="text" placeholder={t("type_keywords")} />
        </Form.Group>
      </div>

      <div className="customerDetail">
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t("first_name")}</Form.Label>
              <Form.Control type="text" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t("last_name")}</Form.Label>
              <Form.Control type="text" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control type="email" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("re_email")}</Form.Label>
              <Form.Control type="email" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t("phone")}</Form.Label>
              <Form.Control type="tel" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t("mobile")}</Form.Label>
              <Form.Control type="tel" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("address")}</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder={t("type_keywords")}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("city")}</Form.Label>
              <Form.Control type="text" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("country")}</Form.Label>
              <Form.Control type="text" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("zip")}</Form.Label>
              <Form.Control type="text" placeholder={t("type_keywords")} />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("city")}</Form.Label>
              <Form.Select type="email" placeholder={t("type_keywords")}>
                {countries.map((country, i) => (
                  <option key={i}>{country.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RequestBook;
