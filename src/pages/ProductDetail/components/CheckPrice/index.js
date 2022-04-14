import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
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
    return moment(moment(), "MM-DD-YYYY").add(2, "days").format("YYYY-MM-DD");
  };
  return (
    <div className="checkPrice mb-4">
      <h4>{service?.IndustryCategoryGroups && service.IndustryCategoryGroups[0] === 1 ? t('check_price_activ') : service.IndustryCategoryGroups[0] === 3 ? t('check_price_goods') : t('check_price') }</h4>
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
                  <option>{t('all_categories')}</option>
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
                    defaultValue={1}
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
