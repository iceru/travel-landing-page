import React, { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { i18n } from "./lang/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

import "./App.scss";

function App() {
  const [language, setLanguage] = useState("en");
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   searchParams.set("lang", language);
  //   setSearchParams(searchParams);
  // }, [window.location.pathname]);

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
          <button className="btn" value="en" onClick={handleOnclick}>
            English
          </button>
          <button className="btn" value="jp" onClick={handleOnclick}>
            Japanese
          </button>
        </div>
      </div>
      <Outlet context={[language]} />
      <Footer />
    </div>
  );
}

export default App;
