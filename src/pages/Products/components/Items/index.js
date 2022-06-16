import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import DefaultImg from "../../../../assets/images/no_image.png";
import { formatMoney } from "../../../../helpers/formatters";

const propTypes = {
  services: PropTypes.array,
  goToDetail: PropTypes.func,
  loadMore: PropTypes.func,
  totalPage: PropTypes.number,
  totalPageOnRequest: PropTypes.number,
  currentPage: PropTypes.number,
  currentPageOnRequest: PropTypes.number,
  state: PropTypes.string,
};

const Items = ({
  services,
  goToDetail,
  loadMore,
  totalPage,
  totalPageOnRequest,
  state,
  currentPage,
  currentPageOnRequest,
}) => {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState('en');

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language])

  return (
    <Row>
      {services && services.length > 0 ? (
        services.map((service, i) => {
          return (
            <Col xs={12} lg={3} key={i}>
              <div className="item" onClick={(e) => {
                e.preventDefault();
                goToDetail(service.Id, service.OnRequestOnly, service.secondDist);
              }}>
                <div className="image">
                  <img
                    src={
                      service.Images !== null
                        ? service.Images[0].Url
                        : DefaultImg
                    }
                    alt={service.Name}
                  />
                </div>
                <div className="info">
                  <a
                    href="#"

                  >
                    <h6 className="title">{service.Name}</h6>
                  </a>

                  <div className="address">
                    {service.PhysicalAddress.PostCode}
                    {service.PhysicalAddress.State ? `, ${service.PhysicalAddress.State}` : ''}
                    {service.PhysicalAddress.City ? `, ${service.PhysicalAddress.City}` : ''}
                    {service.PhysicalAddress.Line1 ? `, ${service.PhysicalAddress.Line1}` : ''}
                    {service.PhysicalAddress.Line2 ? `, ${service.PhysicalAddress.Line2}` : ''}
                  </div>
                  <div className="price">
                    {service.Availability.Calendar.LowestRate &&
                      (lang === 'jp' ? `¥${formatMoney(
                        service.Availability.Calendar.LowestRate
                      )} から` : `From ¥${formatMoney(
                        service.Availability.Calendar.LowestRate
                      )}`)
                    }
                  </div>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: service.LongDescription,
                    }}
                  ></div>
                </div>
                {/* <div className="buttonWrapper">
                  <Button
                    className="w-100"
                    variant="primary"
                    onClick={() =>
                      goToDetail(service.Id, service.OnRequestOnly)
                    }
                  >
                    {t("view_details")}
                  </Button>
                </div> */}
              </div>
            </Col>
          );
        })
      ) : (
        <h3 className="text-center">{t("not_found")}</h3>
      )}

      <div className="loadMore mb-3">
        {totalPage > 1 && totalPage > currentPage && state === "quick" && (
          <Button
            variant="primary"
            className=" py-2"
            onClick={() => loadMore()}
          >
            {t("load_more")}
          </Button>
        )}
      </div>
      <div className="loadMoreRequest mb-3">
        {totalPageOnRequest > 1 &&
          totalPageOnRequest > currentPageOnRequest &&
          state === "request" && (
            <Button
              variant="primary"
              className="py-2"
              onClick={() => loadMore()}
            >
              {t("load_more")}
            </Button>
          )}
      </div>
    </Row>
  );
};

Items.propTypes = propTypes;

export default Items;
