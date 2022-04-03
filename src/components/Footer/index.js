import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/images/logo.svg";
import Img from "../../assets/images/footer-image.webp";

import "./style.scss";

const Footer = () => {
  return (
    <div className="container-fluid footer">
      <Row>
        <Col xs={8} sm="auto">
          <div className="footerLogo">
            <img src={Logo} className="logo" alt="AKO MAG." />
            <div className="mt-4 f-11px">イイかんじな赤穂､ハッシーン!</div>
            <div className="mt-4 text-end f-11px">__ 赤穂マガジン</div>
          </div>
          <div className="socialShare">
            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0 me-2">SHARE</p>
              <a
                href="https://twitter.com/share?text=AKO%20MAG%20-%20%E8%B5%A4%E7%A9%82%E3%83%9E%E3%82%AC%E3%82%B8%E3%83%B3%20%7C%20%E8%A6%B3%E5%85%89%20%E7%A7%BB%E4%BD%8F%20%E3%82%B0%E3%83%AB%E3%83%A1%E7%89%A9%E7%94%A3%E3%81%AE%E3%82%AA%E3%82%B9%E3%82%B9%E3%83%A1%E6%83%85%E5%A0%B1%E3%82%92%E7%99%BA%E4%BF%A1&hashtags=%E8%B5%A4%E7%A9%82,akomag&url=https%3A%2F%2Fako-mag.jp%2F"
                className="socialIcon twitter"
              >
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
              <a
                href="https://www.facebook.com/share.php?u=https%3A%2F%2Fako-mag.jp%2F"
                className="socialIcon facebook"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={5} md="auto" className="bottomFooter">
          <div className="position-relative">
            <a href="https://ako-mag.jp/about/">
              <div className="position-absolute topRight">
                <div className="mb-2">あこう魅力発信基地が運営🙆‍♂️🙆‍♀️</div>
                <p>
                  わたしたち. <FontAwesomeIcon icon={faAngleRight} />
                </p>
              </div>
            </a>
            <picture className="footerImage">
              <img src={Img} />
            </picture>
          </div>
        </Col>
      </Row>
      <div className="copyright">© 一般社団法人あこう魅力発信基地</div>
    </div>
  );
};

export default Footer;
