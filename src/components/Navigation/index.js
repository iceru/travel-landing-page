import React, { useState } from "react";
import Logo from '../../assets/images/logo.svg';
import Logo2 from '../../assets/images/logo.webp';
import SearchIcon from '../../assets/images/icon_search01.svg';
import TwitterIcon from '../../assets/images/icon_tw01.svg';
import InstagramIcon from '../../assets/images/icon_ig01.svg';
import FacebookIcon from '../../assets/images/icon_fb01.svg';

import "./style.scss";
import { Offcanvas } from "react-bootstrap";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="navigation">
        <div className="container-fluid">
          <div className="navbar">
            <div className="logo">
              <a href="https://local-prime.com/">
                <img src={Logo} />
              </a>
            </div>
            <div className="menu">
              <div className="sns">
                <a href="#" className="item">
                  <img src={SearchIcon} />
                </a>
                <a href="https://twitter.com/localprime_" className="item">
                  <img src={TwitterIcon} />
                </a>
                <a href="https://www.instagram.com/localprime_official" className="item">
                  <img src={InstagramIcon} />
                </a>
                <a href="https://www.facebook.com/localprime.offcial" className="item">
                  <img src={FacebookIcon} />
                </a>
              </div>
              <div className="gnav">
                <ul>
                  <li><a href="https://local-prime.com/about">Local Primeについて</a></li>
                  <li><a href="https://local-prime.com/news">読み物</a></li>
                  <li><a href="https://localprime.reforsindo.com/?category=3&lang=jp">買い物</a></li>
                  <li><a href="https://localprime.reforsindo.com/?lang=jp">体験・宿泊</a></li>
                </ul>
              </div>
            </div>

            <div className="spMenu" onClick={handleShow}>
              <a className="menu-trigger">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="logo">
            <a href="https://local-prime.com/">
              <img src={Logo2} />
            </a>
          </div>
          <ul className="firstMenu ofMenu">
            <li><a href="https://local-prime.com/about">Local Primeについて</a></li>
            <li><a href="https://local-prime.com/news">読み物</a></li>
            <li><a href="https://local-prime.com/shopping">買い物</a></li>
            <li><a href="https://local-prime.com/experience">体験・宿泊</a></li>
          </ul>
          <ul className="ofMenu lastMenu">
            <li><a href="https://local-prime.com/sitemap">サイトマップ</a></li>
            <li><a href="https://local-prime.com/guide">ご利用ガイド</a></li>
            <li><a href="https://local-prime.com/use">利用規約</a></li>
            <li><a href="https://local-prime.com/faq">Q&amp;A</a></li>
            <li><a href="https://local-prime.com/contact">お問い合わせ</a></li>
            <li><a href="https://local-prime.com/booth">掲載希望の事業者様へ</a></li>
            <li><a href="https://local-prime.com/company">運営会社</a></li>
            <li><a href="https://local-prime.com/privacy">プライバシーポリシー</a></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
