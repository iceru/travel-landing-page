const baseEndpoint = "https://book.txj.co.jp/v4";

const serviceEndpoint = `${baseEndpoint}/Services`;
const pageEndpoint = `${baseEndpoint}/Pages`;

const endpoints = {
  search: `${serviceEndpoint}/EntityService.jsws/Search`,
  injection: `${serviceEndpoint}/Injection.aspx`,
  searchPage: `${pageEndpoint}/Search.aspx`,
  bookingQuote: `${serviceEndpoint}/BookingService.jsws/GetBookingQuote`,
};

const OREndpoint = "https://belocalprime.reforsindo.com/api";

export { endpoints, OREndpoint };
