import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFrown,
  faShoppingBasket,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import moment from "moment";

import DefaultImg from "../../assets/images/no_image.png";

import { distributorQuick, distributorQuick2 } from "../../helpers/utils";
import { endpoints } from "../../helpers/endpoints";
import { formatMoney } from "../../helpers/formatters";

import "./style.scss";

const Cart = () => {
  const [showCart, setShowCart] = useState("none");
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  useEffect(() => {
    setLang(i18n.language);
  })

  const { items, removeItem, totalUniqueItems, isEmpty } = useCart();

  const goToCABS = () => {
    let products = [];
    let secondDist = false;

    items.map((item) => {
      const data = {
        ProductId: item.Configurations[0].ProductId,
        Commence: item.Configurations[0].Quotes[0].Commence,
        Conclude: item.Configurations[0].Quotes[0].Conclude,
        Pax: item.Configurations[0].Pax,
        TotalPrice: item.Configurations[0].Quotes[0].TotalPrice,
      };
      products = [...products, data];
      secondDist = item.secondDist;
    });

    const favourites = {
      Products: products,
    };

    const brandingStyle = secondDist ? distributorQuick2 : distributorQuick;
    const formData = [
      { name: "type", value: "BookingInjection" },
      { name: "data", value: JSON.stringify(favourites) },
      { name: "exl_dn", value: secondDist ? distributorQuick2 : distributorQuick },
      { name: "exl_bs", value: brandingStyle },
      { name: "exl_lng", value: lang === 'jp' ? 'ja' : lang + "-JP" },
      { name: "exl_cur", value: "JPY" },
      {
        name: "options",
        value: JSON.stringify({ OpenInNewWindow: true }),
      },
    ];

    const form = document.createElement("form");
    form.action = endpoints.injection;
    form.method = "POST";

    formData.forEach(function (item) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = item.name;
      input.value = item.value;

      form.appendChild(input);
    });

    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);
  };

  const setCart = () => {
    const show = showCart === "none" ? "block" : "none";
    setShowCart(show);
  };

  return (
    <>
      <div className="cart">
        <div className="cartWrapper" style={{ display: showCart }}>
          {!isEmpty ? (
            <div className="items container-fluid">
              {items.map((item, i) => (
                <div key={i} className="item row">
                  <div className="image col-4 ps-0">
                    <img
                      alt="test"
                      src={item.Images ? item.Images[0].Url : DefaultImg}
                    />
                  </div>
                  <div className="info col-7 ps-1">
                    <div className="title" title={item.Name}>
                      {item.Name}
                    </div>
                    <div className="date">
                      {moment(item.Configurations[0].Quotes[0].Commence).format(
                        "ll, hh:mm A"
                      )}
                    </div>
                    {item.IndustryCategoryGroups[0] === 3 ? (
                      <div className="qty">
                        {item.quantity} {t("items")}
                      </div>
                    ) : (
                      <>
                        <div className="qty">
                          Pax: {item.Configurations[0].Pax.Adults}
                        </div>
                        {item.IndustryCategoryGroups[0] === 0 && (
                          <div className="duration">
                            Duration:{" "}
                            {item.Configurations[0].Quotes[0].Duration}
                          </div>
                        )}
                      </>
                    )}
                    <div className="price fw-bold">
                      {item.TxCurrencyCode === "JPY" ? "¥" : ""}
                      {item.price && formatMoney(item.price)}
                    </div>
                  </div>
                  <div
                    className="col-1 remove"
                    onClick={() => removeItem(item.id)}
                    style={{ color: "red", marginTop: "4px" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5 className="mb-3 text-center">
              <FontAwesomeIcon icon={faFrown} />
              &nbsp; {t("cart_empty")}
            </h5>
          )}
          {!isEmpty && (
            <div
              className="btn btn-primary w-100 mb-3 fw-bold"
              onClick={() => goToCABS()}
            >
              <FontAwesomeIcon icon={faCheck} />
              &nbsp;{t("continue_payment")}
            </div>
          )}
          <div
            className="btn btn-secondary w-100 fw-bold"
            onClick={() => {
              setShowCart("none");
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
            &nbsp;{t("close")}
          </div>
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
