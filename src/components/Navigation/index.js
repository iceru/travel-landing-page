import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import Img from "../../assets/images/nav-image.webp";
import ImgLg from "../../assets/images/nav-image-lg.webp";
import Img2 from "../../assets/images/nav-image-2.webp";

import "./style.scss";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="container-fluid">
        <Row>
          <Col className="leftNav" xs={9} sm={5} md={"auto"}>
            <div>
              <img src={Logo} alt="AKO MAG." />
              <Row className="items g-0 mt-2 mt-md-3">
                <Col className="itemLink">
                  <Link to="/test">いこう.</Link>
                </Col>
                <Col className="itemLink gray">かおう.</Col>
                <Col className="itemLink">
                  <Link to="/test">すもう.</Link>
                </Col>
                <Col className="itemLink gray">お便り.</Col>
                <Col className="itemLink">
                  <a href="#">わたしたち.</a>
                </Col>
              </Row>
            </div>
            <div className="mt-3">
              温泉やスイーツといったカルチャーと塩田や赤穂浪士といった伝統が溶け合った｢新しい赤穂｣が､今注目を浴びています｡
            </div>
            <div className="mt-3">
              この溢れる｢赤穂｣の魅力を､｢観光｣｢物産｣｢移住｣のカテゴリで発信｡あなたにとってイイ感じの赤穂､見つけてください♪
            </div>
            <div className="text-end">赤穂マガジン.</div>
          </Col>
          <Col xs={9} sm={5} md={"auto"} className="navRight">
            <Row>
              <Col sm={7} md>
                <div className="textSkew">冬のイチオシ</div>
                <div className="navImages">
                  <div className="topRight">
                    <h1>
                      <span>赤穂の冬は､ </span> <br /> 牡蠣小屋と温泉♨️
                    </h1>
                    <p className="mt-2">
                      瀬戸内海が育む牡蠣と <br /> 絶景温泉を堪能
                    </p>
                  </div>
                  <picture className="image">
                    <source srcSet={ImgLg} media="(min-width: 897px)" />
                    <img
                      className="w-100 h-100 of-cover"
                      src={Img}
                      alt="牡蠣小屋と温泉"
                    />
                  </picture>
                </div>
              </Col>
              <Col sm="auto" className="mt-3">
                <Row>
                  <Col xs={5} sm={12}>
                    <picture className="image2">
                      <img
                        className="of-cover"
                        src={Img2}
                        alt="牡蠣小屋と温泉"
                      />
                    </picture>
                  </Col>
                  <Col xs={7} sm={12} className="textDesc">
                    <div>｢夕日眺めながらの牡蠣小屋｣</div>
                    <div className="text-end">｢牡蠣汁...ジュワあつあつ｣</div>
                    <div>｢贅沢な心地よ...｣</div>
                    <div className="text-end">｢うむ...良きかな赤穂｣</div>
                  </Col>
                  hr
                </Row>
                <hr className="dashed" />
                <Row>
                  <Col xs="auto" sm={12}></Col>
                  <Col xs="auto" sm={12}></Col>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          牡蠣小屋 りょうちゃん
                          <small>Google maps</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navigation;
