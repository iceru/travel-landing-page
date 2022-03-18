import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { i18n } from "./lang/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

import "./App.scss";
import Cart from "./components/Cart";

function App() {
  const [language, setLanguage] = useState("en");
  const [searchParams, setSearchParams] = useSearchParams();
  const [langSelected, setLangSelected] = useState();

  useEffect(() => {
    const lang = searchParams.get("lang");
    setLangSelected(lang);
  }, [searchParams]);

  const handleOnclick = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    searchParams.set("lang", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="App">
      <Navigation />
      <div className="translate container">
        <div className="content">
          <FontAwesomeIcon icon={faLanguage} />
          <button
            className={`btn ${langSelected === "en" ? "active" : ""}`}
            value="en"
            onClick={handleOnclick}
          >
            English
          </button>
          <button
            className={`btn ${langSelected === "jp" ? "active" : ""}`}
            value="jp"
            onClick={handleOnclick}
          >
            日本語
          </button>
        </div>
      </div>
      <Outlet context={[language]} />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
