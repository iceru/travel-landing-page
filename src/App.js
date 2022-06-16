import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { i18n } from "./lang/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";

import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [language, setLanguage] = useState("en");
  const [searchParams, setSearchParams] = useSearchParams();
  const [langSelected, setLangSelected] = useState();

  useEffect(() => {
    const lang = i18n.language;
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
      <Cart language={language} />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
