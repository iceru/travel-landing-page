import React from "react";

import Facebook from "../../assets/images/visit-nara/icon-fb.svg";
import Instagram from "../../assets/images/visit-nara/icon-ig.svg";
import Youtube from "../../assets/images/visit-nara/icon-youtube.svg";

import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <nav className="breadcrumbs"></nav>
        <div className="footer_menu clearfix">
          <nav className="fnav">
            <dl className="fnav_column">
              <dt className="fnav_head">Discover</dt>
              <dd className="fnav_body">
                <ul className="fnav_lists">
                  <li className="item_list">
                    <a href="/destinations/" id="footer_destination">
                      Destinations
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/world-heritage/" id="footer_world_heritage">
                      World Heritage
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/seasons/" id="footer_seasons">
                      Seasons
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/history/" id="footer_history">
                      History
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/buddhist-statues/" id="footer_buddhist_statues">
                      Buddhist Statues
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/travel-directory/" id="footer_travel_directory">
                      Travel Directory
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl className="fnav_column">
              <dt className="fnav_head">Things to Do</dt>
              <dd className="fnav_body">
                <ul className="fnav_lists">
                  <li className="item_list">
                    <a href="/see-and-do/" id="footer_see_and_do">
                      See &amp; Do
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/eat-and-drink/" id="footer_eat_and_drink">
                      Eat &amp; Drink
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/shopping/" id="footer_shopping">
                      Shopping
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/event-calendar/" id="footer_vent_calendar">
                      Event Calendar
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/lists-and-stories/" id="footer_lists_and_stories">
                      Lists &amp; Stories
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl className="fnav_column">
              <dt className="fnav_head">Plan Your Trip</dt>
              <dd className="fnav_body">
                <ul className="fnav_lists">
                  <li className="item_list">
                    <a
                      href="/for-first-time-visitor/"
                      id="footer_for_first_time_visitor"
                    >
                      For First-Time Visitors
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/travel-to-nara/" id="footer_travel_to_nara">
                      Travel to Nara
                    </a>
                  </li>
                  <li className="item_list">
                    <a
                      href="/getting-around-nara/"
                      id="footer_getting_around_nara"
                    >
                      Getting Around Nara
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/accommodation/" id="footer_accommodation">
                      Accommodation
                    </a>
                  </li>
                  <li className="item_list">
                    <a href="/travel-tips/" id="footer_travel_tips">
                      Travel Tips
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>
          </nav>
          <div className="footer_other">
            <div className="footer_sns">
              <ul className="item_lists">
                <li className="item_list item_fb">
                  <a
                    href="https://www.facebook.com/visitnarajp/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="Facebook"
                      className="hover_opacity"
                      src={Facebook}
                    />
                  </a>
                </li>
                <li className="item_list item_pint">
                  <a
                    href="https://www.instagram.com/visitnarajp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt="Instagram"
                      className="hover_opacity"
                      src={Instagram}
                    />
                  </a>
                </li>
                <li className="item_list item_yotube">
                  <a
                    href="https://www.youtube.com/channel/UCDU0JXUg9sSQr7AOaFubILQ"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="youtube"
                      className="hover_opacity"
                      src={Youtube}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <dl className="footer_modal_send">
              <dt className="footer_signup_head">Can you also tell us...</dt>
              <dd className="footer_signup_body">
                <select
                  className="item_select"
                  id="signup-answer1"
                  name="gendar"
                >
                  <option value="">Your primary language</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                  <option value="Thai">Thai</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Other language">Other language</option>
                </select>
                <select className="item_select" id="signup-answer2" name="age">
                  <option value="">Your age</option>
                  <option value="under 19">under 19</option>
                  <option value="20 to 34">20 to 34</option>
                  <option value="35 to 49">35 to 49</option>
                  <option value="over 50">over 50</option>
                </select>
                <span className="item_submit js_send" id="signup-send">
                  Send
                </span>
              </dd>
            </dl>
            <div className="footer_modal_complete">
              <div className="item_table">
                <div className="item_cell">
                  Thank you!
                  <br />
                  We will send you seasonal updates.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_address">
          <ul className="footer_links">
            <li className="item_link">
              <a href="/about-this-site/" id="footer_about_this_site">
                About This Site
              </a>
            </li>
            <li className="item_link">
              <a href="/terms-of-use/" id="footer_terms_of_use">
                Terms of Use
              </a>
            </li>
            <li className="item_link">
              <a href="/privacy-policy/" id="footer_privacy_policy">
                Privacy Policy
              </a>
            </li>
            <li className="item_link">
              <a href="/cookie-policy/" id="footer_privacy_policy">
                Cookie Policy
              </a>
            </li>
            <li className="item_link">
              <a href="/contact-us/" id="footer_contact_us">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="item_copy">
            <address>© Nara Prefecture All Rights Reserved.</address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
