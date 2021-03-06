import React from "react";
import { Link } from "react-router-dom";
import './styles.scss';
import footerPhoto from '../Footer/photo/footerPhoto.jpg'

const Footer = () => {
  return (
    <div className="footer" style={{backgroundImage: `url(${footerPhoto})`}}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <Link to="/">Movies</Link>
        </div>
        <div className="footer__content__menus">
            <div className="footer__content__menu">
                <Link to='/'>Home</Link>
                <Link to='/'>Contact us</Link>
                <Link to='/'>Term of services</Link>
                <Link to='/'>About us</Link>
            </div>
            <div className="footer__content__menu">
                <Link to='/'>Live</Link>
                <Link to='/'>FAQ</Link>
                <Link to='/'>Premium</Link>
                <Link to='/'>Privacy policy</Link>
            </div>
            <div className="footer__content__menu">
                <Link to='/'>You must watch</Link>
                <Link to='/'>Recent release</Link>
                <Link to='/'>Top IMDB</Link>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
