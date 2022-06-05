import React from "react";
import Logo from '../../assets/images/logo3_w.svg';
import TwitterIcon from '../../assets/images/icon_tw02.svg'
import InstagramIcon from '../../assets/images/icon_ig02.svg'
import FacebookIcon from '../../assets/images/icon_fb02.svg'

import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 leftFooter">
            <div className="logo">
              <img src={Logo} />
            </div>
            <div className="sns">
              <div className="item">
                <img src={TwitterIcon} />
              </div>
              <div className="item">
                <img src={InstagramIcon} />
              </div>
              <div className="item">
                <img src={FacebookIcon} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block">
            <div className="row secondSection">
              <div className="col-6 firstBox">
                <div className="list">
                  <h3>content</h3>
                  <nav>
                    <ul>
                      <li><a href="/about">Local Primeについて</a></li>
                      <li><a href="/sitemap">サイトマップ</a></li>
                      <li><a href="/guide">ご利用ガイド</a></li>
                      <li><a href="/use">利用規約</a></li>
                      <li><a href="/faq">Q&amp;A</a></li>
                      <li><a href="/contact">お問い合わせ</a></li>
                      <li><a href="/company">運営会社</a></li>
                      <li><a href="/booth">掲載希望の事業者様へ</a></li>
                      <li><a href="/privacy">プライバシーポリシー</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-6 lastBox">
                <div className="list">
                  <h3>category</h3>
                  <nav>
                    <ul>
                      <li><a href="/news">読み物</a></li>
                      <li><a href="/shopping">買い物</a></li>
                      <li><a href="/experience">体験・宿泊</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">Copyrights © SHINKIBUS CO.,LTD. ALL Rights Reserved.</div>
    </div>

  );
};

export default Footer;
