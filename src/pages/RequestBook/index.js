import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";

import { Table, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { countries } from "../../helpers/countries";

import "./style.scss";

const RequestBook = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const [booking, setBooking] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (state && state.booking) {
      setBooking(state.booking);

      searchParams.set("id", state.booking.Id);
      setSearchParams(searchParams);
    }
  });

  return booking ? (
    <div className="rbWrapper container">
      <h5 className="rbTitle mb-2">{booking.Name}</h5>
      <Table bordered responsive className="mb-3">
        <thead>
          <tr>
            <th>{t("product")}</th>
            <th>{t("options")}</th>
            <th>{t("totals")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {booking.Configurations[0].Pax.Adults} Adults Check In <br />
              {moment(booking.Configurations[0].Quotes[0].Commence).format(
                "l"
              )}{" "}
              <br />
              Check Out
              {moment(booking.Configurations[0].Quotes[0].Conclude).format(
                "l"
              )}{" "}
              <br />
            </td>
            <td>¥{booking.Configurations[0].Quotes[0].TotalPrice}</td>
          </tr>
          <tr>
            <td colSpan={2}>Total</td>
            <td>¥{booking.Configurations[0].Quotes[0].TotalPrice}</td>
          </tr>
        </tbody>
      </Table>

      <div className="notes mb-5">
        <Form.Group className="mb-3">
          <Form.Label>{t("special_requests")}</Form.Label>
          <Form.Control type="text" placeholder={t("type_keywords")} />
        </Form.Group>
      </div>

      <div className="customerDetail">
        <h4 className="text-center mb-3">{t("customer_detail")}</h4>
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
  ) : (
    <h4 className="text-center">Page Error</h4>
  );
};

export default RequestBook;
