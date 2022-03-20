import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const propTypes = {
  service: PropTypes.object,
}

const BasicInfo = ({ service }) => {
  const { t } = useTranslation()
  return (
    <Table borderless responsive>
      <tbody>
        <tr>
          <td>{t('name')}</td>
          <td>{service.Name}</td>
        </tr>
        <tr>
          <td>{t('price')}</td>
          <td>{service.Availability.Calendar.LowestRate}</td>
        </tr>
        <tr>
          <td>{t('address')}</td>
          <td>
            {service.PhysicalAddress.Line1}, {service.PhysicalAddress.City},{' '}
            {service.PhysicalAddress.PostCode}, {service.PhysicalAddress.State}
          </td>
        </tr>
        <tr>
          <td>{t('phone')}</td>
          <td>{service.MainPhone.FullPhoneNumberLocalised}</td>
        </tr>
        <tr>
          <td>{t('website')}</td>
          <td>{service.Website || 'No Public Website'}</td>
        </tr>
        <tr>
          <td>{t('email')}</td>
          <td>{service.PublicEmail}</td>
        </tr>
      </tbody>
    </Table>
  )
}

BasicInfo.propTypes = propTypes

export default BasicInfo
