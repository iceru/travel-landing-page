import React from 'react'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
import { useCart } from 'react-use-cart'
import { useTranslation } from 'react-i18next'

import DefaultImg from '../../../../assets/images/no_image.png'

const propTypes = {
  bookingQuotes: PropTypes.object,
  changeQuantity: PropTypes.func,
}

const ProductItems = ({ bookingQuotes, changeQuantity }) => {
  const { addItem } = useCart()
  const { t } = useTranslation()
  console.log(bookingQuotes)
  return (
    <div className="items">
      {_.sortBy(bookingQuotes, 'Name').map((children, i) => (
        <div key={i} className="productItem row align-items-center">
          <div className=" col-12 col-lg-10">
            <div className="info">
              <div className="name">{children.Configurations[0].Name}</div>
              <div className="image">
                <img
                  width={100}
                  height="auto"
                  src={children.Images ? children.Images[0].Url : DefaultImg}
                />
              </div>
              {children.IndustryCategoryGroups[0] === 3 && (
                <div className="qty d-flex">
                  <Form.Label>Quantity: &nbsp;</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      changeQuantity(e.target.value, children.id)
                    }
                    type="number"
                    defaultValue={2}
                  />
                </div>
              )}
              <div className="price">
                {t('price')}: &nbsp;
                {children.TxCurrencyCode === 'JPY' ? '¥' : ''}
                {children.Configurations[0].Quotes &&
                  children.Configurations[0].Quotes[0].TotalPrice}
              </div>
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: children.LongDescription,
                }}
              ></div>
            </div>
          </div>
          <div className="action col-12 col-lg-2">
            <Button variant="primary" onClick={() => addItem(children, children.quantity)}>
              {t('book_now')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

ProductItems.propTypes = propTypes

export default ProductItems
