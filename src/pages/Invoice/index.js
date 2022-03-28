/* eslint-disable */
import axios from "axios";
import { t } from "i18next";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { OREndpoint } from "../../helpers/endpoints";
import { getUrlParam, formatMoney } from "../../helpers/formatters";

import "./style.scss";

const Invoice = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(OREndpoint + "/session/get", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          session_id: getUrlParam("session_id"),
        },
      })
      .then(function (response) {
        if (response.data) {
          setBookingDetails(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    console.log("click");
  };
  return (
    <div className="container">
      {bookingDetails ? (
        <div className="wrapper">
          <div className="header">{t("booking_req_detail_wait")}</div>
          <div className="body">
            <div className="mb-3"> {t("booking_req_instructions")}</div>
            <div className="grey p-3">
              <div className="row">
                <div className="col-3">
                  <b>{t("booking_reference")}</b>
                </div>
                <div className="col-9 border-start">
                  {moment(bookingDetails.requested_at).format("ll")}
                </div>
              </div>
              <div className="row border-top">
                <div className="col-3">
                  <b>{t("booking_reference")}</b>
                </div>
                <div className="col-9 border-start">
                  {bookingDetails.status}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <div className="border-bottom">
                    <b>{t("booked_by")}:</b>
                  </div>
                  <div className="d-flex flex-column">
                    <span>
                      <b>{t("name")}:</b>&nbsp;
                      {bookingDetails.session.metadata
                        .CustomerDetails_firstName +
                        " " +
                        bookingDetails.session.metadata
                          .CustomerDetails_lastName}
                    </span>
                    <span>
                      <b>{t("address")}:</b>&nbsp;
                      {bookingDetails.session.metadata.CustomerDetails_address}
                    </span>
                    <span>
                      <b>{t("phone")}:</b>&nbsp;
                      {bookingDetails.session.metadata.CustomerDetails_phone}
                    </span>
                    <span>
                      <b>{t("mobile")}:</b>&nbsp;
                      {bookingDetails.session.metadata.CustomerDetails_mobile}
                    </span>
                    <span>
                      <b>{t("email")}:</b>&nbsp;
                      {bookingDetails.session.metadata.CustomerDetails_email}
                    </span>
                  </div>
                </div>
                <div className="col-6 border-start">
                  <div className="border-bottom">
                    <b>{t("supplier_information")}:</b>
                  </div>
                  <div className="d-flex flex-column">
                    <span>
                      <b>{t("name")}:</b>&nbsp;
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_SupplierName
                      }
                    </span>
                    <span>
                      <b>{t("address")}:</b>&nbsp;
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_SupplierAddress
                      }
                    </span>
                    <span>
                      <b>{t("phone")}:</b>&nbsp;
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_SupplierPhone
                      }
                    </span>
                    <span>
                      <b>{t("website")}:</b>&nbsp;
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_SupplierWebsite
                      }
                    </span>
                    <span>
                      <b>{t("email")}:</b>&nbsp;
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_SupplierEmail
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 fw-bold">{t("request_to_book")}</div>
              </div>
              <div className="row align-items-start">
                <div className="col-3">
                  <div className="border-bottom border-top">
                    <b>{t("product")}</b>
                  </div>
                  <div className="d-flex flex-column">
                    {bookingDetails.session.metadata.ProductDetails_ProductName}
                  </div>
                </div>
                <div className="col-3 border-start">
                  <div className="border-bottom border-top">
                    <b>{t("options")}</b>
                  </div>
                  <div className="d-flex flex-column">
                    {bookingDetails.session.metadata.ProductDetails_Adults}
                    {t("adult")}
                  </div>
                </div>
                <div className="col-3 border-start border-end">
                  <div className="border-bottom border-top">
                    <b>{t("date")}</b>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="mb-3">
                      <h6 className="mb-0">
                        <b>{t("check_in")}</b>
                      </h6>
                      <p className="mb-0">
                        {moment(
                          bookingDetails.session.metadata
                            .ProductDetails_CommencementDate
                        ).format("ll")}
                      </p>
                    </div>
                    <div className="mb-3">
                      <h6 className="mb-0">
                        <b>{t("check_out")}</b>
                      </h6>
                      <p className="mb-0">
                        {moment(
                          bookingDetails.session.metadata
                            .ProductDetails_ConcludeDate
                        ).format("ll")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="border-bottom border-top">
                    <b>Totals</b>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="text-end">
                      {
                        bookingDetails.session.metadata
                          .ProductDetails_CurrentCurrency
                      }
                      {bookingDetails.session.metadata.ProductDetails_Price &&
                        formatMoney(
                          bookingDetails.session.metadata.ProductDetails_Price
                        )}
                    </h6>
                  </div>
                </div>
                {bookingDetails.product_extras &&
                  JSON.parse(bookingDetails.product_extras).length > 0 &&
                  JSON.parse(bookingDetails.product_extras).map((extra) => {
                    return (
                      <>
                        <div className="col-3 border-top">
                          {JSON.parse(extra).Name}
                        </div>
                        <div className="col-3 border-top" />
                        <div className="col-3 border-top" />
                        <div className="col-3 border-top border-left">
                          <h6 className="text-end">
                            {
                              bookingDetails.session.metadata
                                .ProductDetails_CurrentCurrency
                            }
                            {formatMoney(JSON.parse(extra).TotalCost)}
                          </h6>
                        </div>
                      </>
                    );
                  })}
                <div className="col-9 border-end border-top">
                  <h6 className="text-end">{t("total_gst")}</h6>
                </div>
                <div className="col-3 border-top">
                  <h6 className="text-end">
                    {
                      bookingDetails.session.metadata
                        .ProductDetails_CurrentCurrency
                    }
                    {formatMoney(bookingDetails.session.metadata.TotalPrice)}
                  </h6>
                </div>
                <div className="col-9 border-end border-top">
                  <h6 className="text-end">{t("amount_paid")}</h6>
                </div>
                <div className="col-3 border-top">
                  <h6 className="text-end">
                    {
                      bookingDetails.session.metadata
                        .ProductDetails_CurrentCurrency
                    }
                    0
                  </h6>
                </div>
                <div className="col-9 border-end border-top border-bottom">
                  <h6 className="text-end">{t("amount_owing")}</h6>
                </div>
                <div className="col-3 border-top border-bottom">
                  <h6 className="text-end">
                    {
                      bookingDetails.session.metadata
                        .ProductDetails_CurrentCurrency
                    }
                    {formatMoney(bookingDetails.session.metadata.TotalPrice)}
                  </h6>
                </div>
              </div>
              <b>{t("special_requests")}</b>
              <br />
              <p>
                {bookingDetails.session.metadata.CustomerDetails_specialRequest}
              </p>
            </div>

            <div className="p-3">
              <div className="border-bottom mt-3">
                <h6 className="font-weight-bold">Conditions of Use</h6>
                <p>condition</p>
              </div>
              <div className="border-bottom mt-3">
                <h6 className="font-weight-bold">Booking Terms</h6>
                <p>condition</p>
              </div>
              <div className="border-bottom mt-3">
                <h6 className="font-weight-bold">TXJ Privacy Policy</h6>
                <p onClick={handleClick}>Click to view more</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-center">Not Found</h5>
      )}
    </div>
  );
};

export default Invoice;
