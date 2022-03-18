import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";

import DefaultImg from "../../assets/images/no_image.png";

import "./style.scss";

const Cart = () => {
  const [showCart, setShowCart] = useState("none");

  const { items, removeItem, totalUniqueItems, isEmpty } = useCart();

  console.log(items);

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
                    {item.Configurations[0].Quotes[0].Commence}
                  </div>
                  <div className="qty">
                    Pax: {item.Configurations[0].Pax.Adults}
                  </div>
                  <div className="duration">
                    Duration: {item.Configurations[0].Quotes[0].Duration}
                  </div>
                  <div className="price">
                    {item.TxCurrencyCode === "JPY" ? "¥" : "$"}
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
            <h5>Cart is Empty</h5>
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
