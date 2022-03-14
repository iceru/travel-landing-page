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
              <a href="#" className="socialIcon">
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
              <a href="#" className="socialIcon">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={5} md="auto" className="bottomFooter">
          <div className="position-relative">
            <a href="#">
              <div className="position-absolute topRight">
                <span>あこう魅力発信基地が運営🙆‍♂️🙆‍♀️</span>
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
