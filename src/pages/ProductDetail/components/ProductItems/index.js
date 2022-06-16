import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { toast } from 'react-toastify';

import DefaultImg from "../../../../assets/images/no_image.png";
import { formatMoney } from "../../../../helpers/formatters";

import "./style.scss";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const propTypes = {
  bookingQuotes: PropTypes.array,
  changeQuantity: PropTypes.func,
  onRequest: PropTypes.string,
  service: PropTypes.object,
  quotesInfo: PropTypes.object,
  error: PropTypes.bool,
};

const ProductItems = ({
  bookingQuotes,
  changeQuantity,
  onRequest,
  service,
  quotesInfo,
  error,
}) => {
  const { addItem } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [descMore, setDescMore] = useState(false);
  const [extras, setExtras] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();
  const [errorItems, setErrorItems] = useState(false);
  const [lang, setLang] = useState("en");
  const [available, setAvailable] = useState([]);

  const handleClose = () => setShow(false);
  const success = () => toast.success("Item added to cart!");

  useEffect(() => {
    if (error) {
      setErrorItems(true);
    }
  }, [error]);

  useEffect(() => {
    setLang(i18n.language);
  });

  const submitBooking = (booking) => {
    if (onRequest === "true") {
      booking.selectedExtras = extras;
      setSelectedBooking(booking);
      setShow(true);
    } else {
      addItem(booking, parseInt(booking.quantity));
      success();
    }
  };

  const serviceType = () => {
    let serviceType = "None";
    if (service && service.IndustryCategoryGroups) {
      switch (service.IndustryCategoryGroups[0]) {
        case 0:
          serviceType = "Accommodation";
          break;
        case 1:
          serviceType = "Activities";
          break;
        case 2:
          serviceType = "Restaurant";
          break;
        case 3:
          serviceType = "Produce";
          break;
        default:
          return "None";
      }
    }

    return serviceType;
  };

  const goToRequestBook = () => {
    const selectedItems = extras.filter((item) => {
      return item.ParentId === selectedBooking.Id;
    });

    selectedBooking.selectedExtras = selectedItems;
    const address = `${service.PhysicalAddress.Line1}, ${service.PhysicalAddress.City}, ${service.PhysicalAddress.PostCode}, ${service.PhysicalAddress.State}`;
    const request = {
      ProductId: selectedBooking.Id,
      ProductName: selectedBooking.Name,
      ProductExtras: selectedItems,
      ProductCode: selectedBooking.Code,
      Price: selectedBooking.Configurations[0].Quotes[0].TotalPrice,
      CurrentCurrency: "JPY",
      Language: lang === "jp" ? "ja" : lang,
      IndustryCategoryGroup: serviceType(
        selectedBooking.IndustryCategoryGroups[0]
      ),
      CommencementDate: selectedBooking.Configurations[0].Quotes[0].Commence,
      ConcludeDate: selectedBooking.Configurations[0].Quotes[0].Conclude,
      Duration:
        selectedBooking.IndustryCategoryGroups[0] === 0
          ? quotesInfo.duration
          : null,
      Adults: quotesInfo.pax,
      SupplierName: service.Name,
      SupplierAddress: address,
      SupplierEmail: service.PublicEmail,
      SupplierPhone: service.MainPhone.FullPhoneNumberLocalised,
      SupplierWebsite: service.Website,
      SupplierId: service.Id,
      SupplierCode: service.Code,
    };
    navigate(`/request-book?id=${selectedBooking.Id}`, {
      state: { booking: selectedBooking, request: request },
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

  useEffect(() => {
    if (!isEmpty(bookingQuotes)) {
      const availableItems = bookingQuotes.find(item => { return item?.Configurations[0]?.Quotes })
      availableItems && setAvailable(availableItems);
    }
  }, [bookingQuotes])

  return (
    <>
      {!errorItems && !isEmpty(bookingQuotes) && !isEmpty(available) ? (
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
                    {onRequest === "true"
                      ? t("request_to_book")
                      : (service?.IndustryCategoryGroups && service.IndustryCategoryGroups[0] === 1 ? t('book_now_activ') : service.IndustryCategoryGroups[0] === 3 ? t('book_now_goods') : t('book_now'))}
                  </Button>
                ) : (
                  <p>{service?.IndustryCategoryGroups && service.IndustryCategoryGroups[0] === 1 ? t('not_available_activ') : service.IndustryCategoryGroups[0] === 3 ? t('not_available_goods') : t('not_available')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5 className="text-center">{service?.IndustryCategoryGroups && service.IndustryCategoryGroups[0] === 1 ? t('not_available_activ') : service.IndustryCategoryGroups[0] === 3 ? t('not_available_goods') : t('not_available')}</h5>
      )}

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
