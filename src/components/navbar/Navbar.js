import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLocalMovies, MdOutlineRadio } from "react-icons/md";
import { UserAuth } from "../../context/Authcontext";
import logo from "../assets/logo.png";

import "./Navbar.css";
import { async } from "@firebase/util";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [mobile, setMobile] = useState(false);
  const [color1, setColor1] = useState(true);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/login");
  };

  const handlelogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleaccount = () => {
    navigate("/account");
  };

  const handlehome = () => {
    navigate("/");
    setColor1(true);
    setColor2(false);
    setColor3(false);
  };

  const handlemovie = () => {
    navigate("/searchmovie");
    setColor1(false);
    setColor2(true);
    setColor3(false);
  };

  const handletv = () => {
    navigate("/searchtv");
    setColor1(false);
    setColor2(false);
    setColor3(true);
  };

  const handleClick = () => {
    setMobile(!mobile);
  };

  return (
    <div className="navbar">
      {user?.email ? (
        <div>
          <div className="navbar-container">
            <div className="navbar-logo" onClick={handlehome}>
              <img src={logo} alt="/"></img>
              <h1>tMovies</h1>
            </div>
            <div className="navbar-content">
              <div
                className={color1 ? "navbar-section submit" : "navbar-section"}
                onClick={handlehome}
              >
                <AiOutlineHome />
                <h3>Home</h3>
              </div>
              <div
                className={color2 ? "navbar-section submit" : "navbar-section"}
                onClick={handlemovie}
              >
                <MdOutlineLocalMovies />
                <h3>Movie</h3>
              </div>
              <div
                className={color3 ? "navbar-section submit" : "navbar-section"}
                onClick={handletv}
              >
                <MdOutlineRadio />
                <h3>Tv series</h3>
              </div>
            </div>
            <div className="navbar-login">
              <AiOutlineMenu className="icon" onClick={handleClick} />
              <button onClick={handleaccount}>Account</button>
              <button onClick={handlelogout}>Log Out</button>
            </div>
          </div>
          <div className={mobile ? "mobile-ui" : "mobile-ui hide"}>
            <ul className="mobile-nav">
              <li onClick={handlehome}>Home</li>
              <li onClick={handlemovie}>Movie</li>
              <li onClick={handletv}>Tv series</li>
            </ul>
            <div className="mobile-menu-btn">
              <button onClick={handleaccount}>Account</button>
              <button onClick={handlelogout}>Log Out</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar-container">
            <div className="navbar-logo" onClick={handlehome}>
              <img src={logo} alt="/"></img>
              <h1>tMovies</h1>
            </div>
            <div className="navbar-content">
              <div
                className={color1 ? "navbar-section submit" : "navbar-section"}
                onClick={handlehome}
              >
                <AiOutlineHome />
                <h3>Home</h3>
              </div>
              <div
                className={color2 ? "navbar-section submit" : "navbar-section"}
                onClick={handlemovie}
              >
                <MdOutlineLocalMovies />
                <h3>Movie</h3>
              </div>
              <div
                className={color3 ? "navbar-section submit" : "navbar-section"}
                onClick={handletv}
              >
                <MdOutlineRadio />
                <h3>Tv series</h3>
              </div>
            </div>
            <div className="navbar-login">
              <AiOutlineMenu className="icon" onClick={handleClick} />
              <button onClick={handlelogin}>Login</button>
            </div>
          </div>
          <div className={mobile ? "mobile-ui" : "mobile-ui hide"}>
            <ul className="mobile-nav">
              <li onClick={handlehome}>Home</li>
              <li onClick={handlemovie}>Movie</li>
              <li onClick={handletv}>Tv series</li>
            </ul>
            <div className="mobile-menu-btn">
              <button onClick={handlelogin}>Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
