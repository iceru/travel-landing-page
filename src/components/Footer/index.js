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
          <div className="col-12 col-lg-6">
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
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">Copyrights © SHINKIBUS CO.,LTD. ALL Rights Reserved.</div>
    </div>

  );
};

export default Footer;
