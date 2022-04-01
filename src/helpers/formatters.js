export function getUrlParam(name = "", url = "") {
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&"); /* eslint-disable-line */

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const defaultOptions = {
  thousandsSeparator: ",",
  symbol: "",
};

export function formatMoney(value, options) {
  if (typeof value !== "number") value = parseInt(value);
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}`;
}
