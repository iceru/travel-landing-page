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
              <a href="https://local-prime.com">
                <img src={Logo} />
              </a>
            </div>
            <div className="sns">
              <a href="https://twitter.com/localprime_" target='_blank' rel='noreferrer' className="item">
                <img src={TwitterIcon} />
              </a>
              <a href="https://www.instagram.com/localprime_official/" target='_blank' rel='noreferrer'  className="item">
                <img src={InstagramIcon} />
              </a>
              <a href="https://www.facebook.com/localprime.offcial" target='_blank' rel='noreferrer'  className="item">
                <img src={FacebookIcon} />
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block">
            <div className="row secondSection">
              <div className="col-6 firstBox">
                <div className="list">
                  <h3>content</h3>
                  <nav>
                    <ul>
                      <li><a href="https://local-prime.com/about">Local Primeについて</a></li>
                      <li><a href="https://local-prime.com/sitemap">サイトマップ</a></li>
                      <li><a href="https://local-prime.com/guide">ご利用ガイド</a></li>
                      <li><a href="https://local-prime.com/use">利用規約</a></li>
                      <li><a href="https://local-prime.com/faq">Q&amp;A</a></li>
                      <li><a href="https://local-prime.com/contact">お問い合わせ</a></li>
                      <li><a href="https://local-prime.com/company">運営会社</a></li>
                      <li><a href="https://local-prime.com/booth">掲載希望の事業者様へ</a></li>
                      <li><a href="https://local-prime.com/privacy">プライバシーポリシー</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-6 lastBox">
                <div className="list">
                  <h3>category</h3>
                  <nav>
                    <ul>
                      <li><a href="https://local-prime.com/news">読み物</a></li>
                      <li><a href="https://localprime.reforsindo.com/?category=3">買い物</a></li>
                      <li><a href="https://localprime.reforsindo.com/">体験・宿泊</a></li>
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
