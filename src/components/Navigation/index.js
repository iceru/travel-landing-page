import React from "react";
import Logo from '../../assets/images/logo.svg';
import SearchIcon from '../../assets/images/icon_search01.svg';
import TwitterIcon from '../../assets/images/icon_tw01.svg';
import InstagramIcon from '../../assets/images/icon_ig01.svg';
import FacebookIcon from '../../assets/images/icon_fb01.svg';

import "./style.scss";

const Navigation = () => {
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
                  <li><a href="#">買い物</a></li>
                  <li><a href="https://local-prime.com/experience">体験・宿泊</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
