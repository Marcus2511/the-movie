import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import "./Heroslide.css";
import { v4 as uuid } from "uuid";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  SwiperCore.use([Autoplay]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 6));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        loop={true}
        autoplay={{ delay: 2000 }}
        spaceBetween={0}
        slidesPerView={1}
        className="hero-swiper"
      >
        {movieItems &&
          movieItems.map((items) => {
            return (
              <>
                <SwiperSlide key={uuid()}>
                  <Heroposter data={items} />
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </div>
  );
};

const Heroposter = (props) => {
  const items = props.data;
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={apiConfig.originalImage(items.backdrop_path)}
        alt="/"
        className="poster"
      />
      <div className="poster-movie">
        <div className="poster-info">
          <h1>{items.title}</h1>
          <h4>{items.overview}</h4>
          <div className="poster-button">
            <button
              className="now"
              onClick={()=>navigate(`/movie/${items.id}`)}
            >
              Watch now !
            </button>
            {/* <button className="trailer">Watch trailer</button> */}
          </div>
        </div>
        <img src={apiConfig.w500Image(items.poster_path)} alt="/" />
      </div>
    </div>
  );
};

export default HeroSlide;
