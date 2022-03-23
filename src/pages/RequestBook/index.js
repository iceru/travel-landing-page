import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import moment from "moment";

import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { countries } from "../../helpers/countries";

import "./style.scss";

const RequestBook = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const [booking, setBooking] = useState();

  useEffect(() => {
    if (state && state.booking) {
      setBooking(state.booking);
    }
  }, []);

  return booking ? (
    <div className="rbWrapper container">
      <h4 className="rbTitle mb-3">{booking.Name}</h4>
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
            <td>{booking.Name}</td>
            <td>
              <div className="mb-3">
                {booking.Configurations[0].Pax.Adults} Adults
              </div>
              <div className="mb-3">
                Check In &nbsp;
                {moment(booking.Configurations[0].Quotes[0].Commence).format(
                  "l"
                )}
              </div>
              <div>
                Check Out &nbsp;
                {moment(booking.Configurations[0].Quotes[0].Conclude).format(
                  "l"
                )}
              </div>
              <br />
            </td>
            <td>¥{booking.Configurations[0].Quotes[0].TotalPrice}</td>
          </tr>
          {booking.selectedExtras &&
            booking.selectedExtras.map((extra, i) => {
              return (
                <tr key={i}>
                  <td></td>
                  <td>{extra.Name}</td>
                  <td>¥{extra.TotalCost}</td>
                </tr>
              );
            })}
          <tr>
            <td colSpan={2} className="text-end">
              Total
            </td>
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
        <h4 className="text-center mb-4">{t("customer_detail")}</h4>
        <form>
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
              <Form.Group className="mb-4">
                <Form.Label>{t("city")}</Form.Label>
                <Form.Select type="email" placeholder={t("type_keywords")}>
                  {countries.map((country, i) => (
                    <option key={i}>{country.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button className="fw-bold">{t("submit")}</Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  ) : (
    <h4 className="text-center">Page Error</h4>
  );
};

export default RequestBook;
