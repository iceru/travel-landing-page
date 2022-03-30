import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Guest from "../../../../assets/images/guest.png";
import Night from "../../../../assets/images/night.png";

const propTypes = {
  service: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const CheckPrice = ({ service, handleSubmit }) => {
  const { t } = useTranslation();

  const setMinDate = () => {
    debugger; //eslint-disable-line
    const today = new Date();
    let dd =
      today.getDate() < 30
        ? today.getDate() + 2
        : today.getDate() === 30
        ? 1
        : 2;
    let mm = today.getDate() < 30 ? today.getMonth() + 1 : today.getMonth() + 2;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div className="checkPrice mb-4">
      <h4>{t("check_price")}</h4>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-wrap">
            {service &&
            service.IndustryCategoryGroups &&
            service.IndustryCategoryGroups[0] !== 3 ? (
              <div className="formDate mb-3 mb-lg-0">
                <Form.Control
                  className="me-2"
                  defaultValue={setMinDate()}
                  type="date"
                  min={setMinDate()}
                />
              </div>
            ) : (
              <div className="formCategories mb-3 mb-lg-0">
                <div className="icon">
                  <FontAwesomeIcon icon={faListDots} />
                </div>
                <Form.Select>
                  <option>All Categories</option>
                  <option>Dairy</option>
                  <option>Wine</option>
                </Form.Select>
              </div>
            )}

            {service &&
              service.IndustryCategoryGroups &&
              service.IndustryCategoryGroups[0] === 0 && (
                <div className="formIcon mb-3 mb-lg-0">
                  <div className="icon">
                    <img src={Night} />
                  </div>
                  <Form.Control
                    className="me-2"
                    defaultValue={1}
                    type="number"
                    name="duration"
                  />
                </div>
              )}
            {service &&
              service.IndustryCategoryGroups &&
              service.IndustryCategoryGroups[0] !== 3 && (
                <div className="formIcon">
                  <div className="icon">
                    <img src={Guest} />
                  </div>
                  <Form.Control
                    className="me-2"
                    defaultValue={2}
                    type="number"
                    name="pax"
                  />
                </div>
              )}
          </div>
          <div>
            <Button type="submit" variant="secondary" className="fw-bold">
              {t("search")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

CheckPrice.propTypes = propTypes;

export default CheckPrice;
