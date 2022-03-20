import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import DefaultImg from "../../assets/images/no_image.png";

import "./style.scss";
import moment from "moment";

const Cart = () => {
  const [showCart, setShowCart] = useState("none");
  const { t } = useTranslation();

  const { items, removeItem, totalUniqueItems, isEmpty } = useCart();

  const setCart = () => {
    const show = showCart === "none" ? "block" : "none";
    setShowCart(show);
  };

  return (
    <>
      <div className="cart">
        <div className="cartWrapper" style={{ display: showCart }}>
          {!isEmpty ? (
            items.map((item, i) => (
              <div key={i} className="item row">
                <div className="image col-4">
                  <img
                    alt="test"
                    src={item.Images ? item.Images[0].Url : DefaultImg}
                  />
                </div>
                <div className="info col-7">
                  <div className="title">{item.Name}</div>
                  <div className="date">
                    {moment(item.Configurations[0].Quotes[0].Commence).format(
                      "l"
                    )}
                  </div>
                  {item.IndustryCategoryGroups[0] === 3 ? (
                    <div className="qty">Qty: {item.quantity}</div>
                  ) : (
                    <>
                      <div className="qty">
                        Pax: {item.Configurations[0].Pax.Adults}
                      </div>
                      {item.IndustryCategoryGroups[0] === 0 && (
                        <div className="duration">
                          Duration: {item.Configurations[0].Quotes[0].Duration}
                        </div>
                      )}
                    </>
                  )}
                  <div className="price">
                    {item.TxCurrencyCode === "JPY" ? "¥" : ""}
                    {item.price}
                  </div>
                </div>
                <div
                  className="col-1 remove"
                  onClick={() => removeItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            ))
          ) : (
            <h5>{t("cart_empty")}</h5>
          )}
        </div>
        <button className="cartButton btn" onClick={() => setCart()}>
          <FontAwesomeIcon icon={faShoppingBasket} className="fa-fw" />
          <div className="cartTotal">{totalUniqueItems}</div>
        </button>
      </div>
    </>
  );
};

export default Cart;
