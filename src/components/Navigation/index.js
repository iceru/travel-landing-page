import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import Logo from "../../assets/images/visit-nara/logo.svg";
import Search from "../../assets/images/visit-nara/search.svg";
import Menu from "../../assets/images/visit-nara/icon-menu.svg";

import "./style.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(30);

  let domNode = useClickOutside(() => {
    setSidebar(false);
  });

  useEffect(() => {
    let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
    function onScroll() {
      if (currentPosition > scrollTop) {
        // downscroll code
        setScrolling(true);
      } else if (currentPosition === 0) {
        setScrolling(false);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    if (currentPosition > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <>
      <nav className="navigation">
        <div className="container">
          <Row>
            <Col xs={5}>
              <div className="search">
                <Form.Control placeholder="Search the Nara directory here"></Form.Control>
                <div className="icon">
                  <img src={Search} />
                </div>
              </div>
            </Col>
            <Col xs={2}>
              <div className="logo">
                <img src={Logo} />
              </div>
            </Col>
            <Col xs={5}>
              <div className="menu">
                <ul>
                  <li>Discover</li>
                  <li>Things to Do</li>
                  <li>Plan Your Trip</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </nav>
      <div className={`headerSmall ${scrolling ? "active" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="iconSearch">
            <img src={Search} />
          </div>
          <div className="logo">
            <img src={Logo} />
          </div>
          <div
            className="iconMenu"
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
            <img src={Menu} />
          </div>
        </div>
      </div>
      <nav
        className="gnav trans_trf"
        style={{ transform: sidebar ? "translateX(-105%)" : "" }}
        ref={domNode}
      >
        <ul className="gnav_lists">
          <li className="item_list item_01">
            <a href="#">Discover</a>
            <ul className="gnav_sublists">
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/destinations/"
                  id="head_destination"
                >
                  Destinations
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/world-heritage/"
                  id="head_world_heritage"
                >
                  World Heritage
                </a>
              </li>
              <li className="item_sublist">
                <a href="https://www.visitnara.jp/seasons/" id="head_seasons">
                  Seasons
                </a>
              </li>
              <li className="item_sublist">
                <a href="https://www.visitnara.jp/history/" id="head_history">
                  History
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/buddhist-statues/"
                  id="head_buddhist_statues"
                >
                  Buddhist Statues
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/travel-directory/"
                  id="head_travel_directory"
                >
                  Travel Directory
                </a>
              </li>
            </ul>
          </li>
          <li className="item_list item_02">
            <a href="#">Things to Do</a>
            <ul className="gnav_sublists">
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/see-and-do/"
                  id="head_see_and_do"
                >
                  See &amp; Do
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/eat-and-drink/"
                  id="head_eat_and_drink"
                >
                  Eat &amp; Drink
                </a>
              </li>
              <li className="item_sublist">
                <a href="https://www.visitnara.jp/shopping/" id="head_shopping">
                  Shopping
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/event-calendar/"
                  id="head_event_calendar"
                >
                  Event Calendar
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/lists-and-stories/"
                  id="head_lists_and_stories"
                >
                  Lists &amp; Stories
                </a>
              </li>
            </ul>
          </li>
          <li className="item_list item_03">
            <a href="#">Plan Your Trip</a>
            <ul className="gnav_sublists">
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/for-first-time-visitor/"
                  id="head_for_first_time_visitor"
                >
                  For First-Time Visitors
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/travel-to-nara/"
                  id="head_travel_to_nara"
                >
                  Travel to Nara
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/getting-around-nara/"
                  id="head_getting_around_nara"
                >
                  Getting Around Nara
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/accommodation/"
                  id="head_accommodation"
                >
                  Accommodation
                </a>
              </li>
              <li className="item_sublist">
                <a
                  href="https://www.visitnara.jp/travel-tips/"
                  id="head_travel_tips"
                >
                  Travel Tips
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
