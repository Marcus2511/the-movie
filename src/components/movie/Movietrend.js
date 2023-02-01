import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import youtube from "../../components/assets/youtube.png";
import { v4 as uuid } from "uuid";
import "./Movie.css";
import { UserAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Movietrend = () => {
  const [item, setItem] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getList = async () => {
      const params = {};
      try {
        const response = await tmdbApi.getMoviesList(movieType.top_rated, {
          params,
        });
        setItem(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper spaceBetween={10} slidesPerView={5}>
        {item &&
          item.map((items) => {
            return (
              <>
                <SwiperSlide key={uuid()}>
                  <div className="movie-card">
                    <img
                      src={apiConfig.w500Image(items.poster_path)}
                      alt="/"
                    ></img>
                    <img
                      src={youtube}
                      alt="/"
                      className="youtube small"
                      onClick={() => {
                        navigate(`/movie/${items.id}`);
                      }}
                    />
                    <div className="movie-title">{items.title}</div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Movietrend;
