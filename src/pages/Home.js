import React from "react";
import Heroslide from "../components/hero-slide/Heroslide";
import Movie from "../components/movie/Movie";
import Movieup from "../components/movie/Movieup";
import Movietrend from "../components/movie/Movietrend";
import Tv from "../components/tvshow/Tv";
import Tvtrend from "../components/tvshow/Tvtrend";
import Tvup from "../components/tvshow/Tvup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const handlenavi = () => {
    navigate("/searchmovie");
  };

  const handlenavitv = () => {
    navigate("/searchtv");
  };
  return (
    <div className="container">
      <Heroslide />
      <div className="cagetory">
        <div className="movie">
          <div className="home-movie-title">
            <h1>Popular movies</h1>
            <button onClick={handlenavi}>View more</button>
          </div>
          <Movie />
        </div>
        <div className="movie">
          <div className="home-movie-title">
            <h1>Trending movies</h1>
            <button onClick={handlenavi}>View more</button>
          </div>
          <Movietrend />
        </div>
        <div className="movie">
          <div className="home-movie-title">
            <h1>Up coming</h1>
            <button onClick={handlenavi}>View more</button>
          </div>
          <Movieup />
        </div>
        <div className="movie">
          <div className="home-movie-title">
            <h1>Popular tv shows</h1>
            <button onClick={handlenavitv}>View more</button>
          </div>
          <Tv />
        </div>
        <div className="movie">
          <div className="home-movie-title">
            <h1>Trending tv shows</h1>
            <button onClick={handlenavitv}>View more</button>
          </div>
          <Tvtrend />
        </div>
        <div className="movie">
          <div className="home-movie-title">
            <h1>On-air tv shows</h1>
            <button onClick={handlenavitv}>View more</button>
          </div>
          <Tvup />
        </div>
      </div>
    </div>
  );
};

export default Home;
