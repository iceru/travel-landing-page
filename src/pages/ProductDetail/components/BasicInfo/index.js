import React from "react";
import PropTypes from "prop-types";

import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { formatMoney } from "../../../../helpers/formatters";

const propTypes = {
  service: PropTypes.object,
};

const BasicInfo = ({ service }) => {
  const { t } = useTranslation();
  return (
    <Table borderless responsive>
      <tbody>
        <tr>
          <td>{t("name")}</td>
          <td>{service.Name}</td>
        </tr>
        <tr>
          <td>{t("price")}</td>
          <td>
            {service.Availability.Calendar.LowestRate &&
              `¥${formatMoney(service.Availability.Calendar.LowestRate)}`}
          </td>
        </tr>
        <tr>
          <td>{t("address")}</td>
          <td>
            {service.PhysicalAddress.PostCode}, {service.PhysicalAddress.State},{service.PhysicalAddress.City},  {service.PhysicalAddress.Line1}, {service.PhysicalAddress.Line2}
          </td>
        </tr>
        <tr>
          <td>{t("phone")}</td>
          <td>{service.MainPhone.FullPhoneNumberLocalised || "-"}</td>
        </tr>
        <tr>
          <td>{t("website")}</td>
          <td>{(<a style={{ textDecoration: 'underline' }} target="_blank" href={service.Website.includes('https') ? service.Website : `https://${service.Website}`} rel="noreferrer">{service.Website}</a>) || "No Public Website"}</td>
        </tr>
        <tr>
          <td>{t("email")}</td>
          <td>{service.PublicEmail ? (<a style={{ textDecoration: 'underline' }} href={`mailto:${service.PublicEmail}`}>{service.PublicEmail}</a>) : "-"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

BasicInfo.propTypes = propTypes;

export default BasicInfo;
