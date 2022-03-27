import React, { useState } from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";
import moment from "moment";

import DefaultImg from "../../../../assets/images/no_image.png";
import { formatMoney } from "../../../../helpers/formatters";

import "./style.scss";
import { useNavigate } from "react-router-dom";

const propTypes = {
  bookingQuotes: PropTypes.array,
  changeQuantity: PropTypes.func,
  onRequest: PropTypes.string,
};

const ProductItems = ({ bookingQuotes, changeQuantity, onRequest }) => {
  const { addItem } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [descMore, setDescMore] = useState(false);
  const [extras, setExtras] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();

  const handleClose = () => setShow(false);

  const submitBooking = (booking) => {
    if (onRequest === "true") {
      booking.selectedExtras = extras;
      setSelectedBooking(booking);
      setShow(true);
    } else {
      addItem(booking, parseInt(booking.quantity));
    }
  };

  const goToRequestBook = () => {
    const selectedItems = extras.filter((item) => {
      return item.ParentId === selectedBooking.Id;
    });
    selectedBooking.selectedExtras = selectedItems;
    navigate(`/request-book?id=${selectedBooking.Id}`, {
      state: { booking: selectedBooking },
    });
  };

  const seeMore = () => {
    setDescMore(!descMore);
  };

  const selectedExtras = (extra, booking, checked) => {
    extra.ParentId = booking.Id;
    if (extras.length > 0) {
      extras.map((item) => {
        if (item.Id !== extra.Id) {
          setExtras((item) => [...item, extra]);
        } else {
          if (!checked) {
            const filtered = extras.filter((item) => {
              return item.Id !== extra.Id;
            });

            setExtras(filtered);
          }
        }
      });
    } else {
      setExtras((item) => [...item, extra]);
    }
  };

  return (
    <>
      <div className="items">
        {_.sortBy(bookingQuotes, "Name").map((booking, i) => (
          <div key={i} className="productItem row align-items-center">
            <div className=" col-12 col-lg-10">
              <div className="info">
                <div className="name">{booking.Configurations[0].Name}</div>
                <div className="image">
                  <img
                    width={100}
                    height="auto"
                    src={booking.Images ? booking.Images[0].Url : DefaultImg}
                  />
                </div>
                {booking.IndustryCategoryGroups[0] === 3 ? (
                  <div className="qty d-flex">
                    <Form.Label>{t("quantity")}: &nbsp;</Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        changeQuantity(e.target.value, booking.id)
                      }
                      type="number"
                      defaultValue={2}
                    />
                  </div>
                ) : (
                  booking.Configurations[0].Quotes && (
                    <div className="time qty d-flex">
                      <Form.Label>
                        {t("start_time", {
                          time: moment(
                            booking.Configurations[0].Quotes[0].Commence
                          ).format("hh:mm"),
                        })}{" "}
                        &nbsp;
                      </Form.Label>
                      <Form.Select>
                        <option>
                          {moment(
                            booking.Configurations[0].Quotes[0].Commence
                          ).format("hh:mm")}
                        </option>
                      </Form.Select>
                    </div>
                  )
                )}
                {booking.Configurations[0].Quotes && (
                  <div className="price">
                    {t("price")}: &nbsp;
                    {booking.TxCurrencyCode === "JPY" ? "¥" : ""}
                    {booking.Configurations[0].Quotes &&
                      formatMoney(
                        booking.Configurations[0].Quotes[0].TotalPrice
                      )}
                  </div>
                )}
                {booking.Extras &&
                  booking.IndustryCategoryGroups[0] !== 3 &&
                  booking.Extras.length > 0 && (
                    <div className="extras">
                      <Form.Label>Extras: &nbsp;</Form.Label>
                      {booking.Extras.map((extra, i) => {
                        return (
                          <div className="extraItem" key={i}>
                            <Form.Check
                              type="checkbox"
                              label={`${extra.Name} ¥${extra.TotalCost}`}
                              onChange={() =>
                                selectedExtras(
                                  extra,
                                  booking,
                                  event.target.checked
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                {booking.LongDescription && (
                  <>
                    <div
                      className={`desc ${descMore ? "active" : ""}`}
                      dangerouslySetInnerHTML={{
                        __html: booking.LongDescription,
                      }}
                    ></div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        seeMore();
                      }}
                      className="seeMore"
                    >
                      + {t("see_more")}
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="action col-12 col-lg-2">
              {booking.Configurations[0].Quotes ? (
                <Button
                  variant="primary"
                  onClick={() => submitBooking(booking)}
                >
                  {onRequest === "true" ? t("request_to_book") : t("book_now")}
                </Button>
              ) : (
                <p>Not Available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("modal_header")}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          dangerouslySetInnerHTML={{ __html: t("modal_desc") }}
        ></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={goToRequestBook}>
            {t("confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ProductItems.propTypes = propTypes;

export default ProductItems;
