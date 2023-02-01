import React from "react";
import background from "../components/assets/background.jpg";
import logo from "../components/assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { UserAuth } from "../context/Authcontext";
import { async } from "@firebase/util";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="Login-page">
      <div className="Login-background">
        <img src={background} alt="/" />
      </div>
      <div className="Login-form">
        <div className="Login-logo">
          <img src={logo} alt="/"></img>
        </div>
        <div className="Login-info">
          <h2>Sign In</h2>
          <div className="Login-userinfo">
            <form className="Login-log" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              ></input>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                autoComplete="current-password"
              />
              <div className="login-button">
                <button>Sign in</button>
              </div>
            </form>
            <div className="help">
              <p>Need help?</p>
            </div>
            <div className="sign-up">
              <span>Don't have an account?</span>
              <p onClick={handleClick}>Sign up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
