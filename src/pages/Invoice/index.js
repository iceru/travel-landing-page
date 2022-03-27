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

  useEffect(() => {
    const data = {
      session: {
        id: "cs_test_c15JdQcLst7hINujhpoPUdRgi6A766aCeXHIJEwwdxRkLXN1dedWP0fCZF",
        object: "checkout.session",
        after_expiration: null,
        allow_promotion_codes: null,
        amount_subtotal: null,
        amount_total: null,
        automatic_tax: {
          enabled: false,
          status: null,
        },
        billing_address_collection: null,
        cancel_url:
          "https://alfred.txi.co.id/nara/?lang=en&page=form&id=de817cc9-e4a0-4263-9e2b-bd468fffdbd2",
        client_reference_id: null,
        consent: null,
        consent_collection: null,
        currency: null,
        customer: "cus_LOZhd4ktKCxCm1",
        customer_creation: "always",
        customer_details: null,
        customer_email: "hafiz@mail.com",
        expires_at: 1648354402,
        livemode: false,
        locale: "en",
        metadata: {
          CustomerDetails_address: "hafiz@mail.com",
          CustomerDetails_business: "",
          CustomerDetails_city: "test",
          CustomerDetails_country: "31_Azerbaijan",
          CustomerDetails_email: "hafiz@mail.com",
          CustomerDetails_firstName: "Muhamad",
          CustomerDetails_lastName: "Hafiz",
          CustomerDetails_marketing: "",
          CustomerDetails_mobile: "081231321321",
          CustomerDetails_phone: "081321321321321",
          CustomerDetails_state: "test",
          CustomerDetails_zipcode: "21321321",
          CustomerDetails_specialRequest: "",
          ProductDetails_Adults: "2",
          ProductDetails_CommencementDate: "2022-03-27T14:00:00",
          ProductDetails_ConcludeDate: "2022-03-28T12:00:00",
          ProductDetails_Duration: "1",
          ProductDetails_CurrentCurrency: "JPY",
          ProductDetails_IndustryCategoryGroup: "Accommodation",
          ProductDetails_Language: "en",
          ProductDetails_ProductId: "5f2302c6-e9f6-458f-beca-9595a7343dad",
          ProductDetails_ProductName: "Accommodation OR Product ONE",
          ProductDetails_Price: "5000",
          ProductDetails_SupplierName: "Accommodation OR test ONE",
          ProductDetails_SupplierPhone: "46245234",
          ProductDetails_SupplierEmail: "rharsana@v3leisure.com",
          ProductDetails_SupplierWebsite: "www.web.com",
          ProductDetails_SupplierId: "de817cc9-e4a0-4263-9e2b-bd468fffdbd2",
          ProductDetails_SupplierAddress: "address line 1, Nara, 123123",
          TotalPrice: "5000",
        },
        mode: "setup",
        payment_intent: null,
        payment_link: null,
        payment_method_options: [],
        payment_method_types: ["card"],
        payment_status: "no_payment_required",
        phone_number_collection: {
          enabled: false,
        },
        recovered_from: null,
        setup_intent: "seti_1KhmXfLTLhrkiGGNOnuhKM4d",
        shipping: null,
        shipping_address_collection: null,
        shipping_options: [],
        shipping_rate: null,
        status: "complete",
        submit_type: null,
        subscription: null,
        success_url:
          "https://alfred.txi.co.id/nara?page=thankyou&&session_id={CHECKOUT_SESSION_ID}&lang=en",
        total_details: null,
        url: null,
      },
      product_extras: "[]",
      status: "Pending",
      requested_at: "2022-03-27T03:14:14.000000Z",
    };
    setBookingDetails(data);
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
                      {formatMoney(
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
