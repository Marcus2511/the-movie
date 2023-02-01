import React from "react";
import logo from "../assets/logo.png";
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="/" />
        <h2>tMovies</h2>
      </div>
      <div className="footer-info">
        <div className="col-link">
          <a href="">Home</a>
          <a href="">Contact us</a>
          <a href="">Term of services</a>
          <a href="">About us</a>
        </div>
        <div className="col-link">
          <a href="">Live</a>
          <a href="">FAQ</a>
          <a href="">Premium</a>
          <a href="">Privacy policy</a>
        </div>
        <div className="col-link">
          <a href="">You must watch</a>
          <a href="">Recent release</a>
          <a href="">Top IMDB</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
