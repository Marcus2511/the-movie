import React, { useEffect, useState } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import youtube from "../../components/assets/youtube.png";
import "./Similar.css";

const Similar = ({ id, category }) => {
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getmovie = async () => {
      const res = await tmdbApi.similar(category, id);
      setMovie(res?.results);
    };
    getmovie();
  });
  return (
    <div className="similar-wraper">
      <h3> Similar</h3>
      <Swiper spaceBetween={10} slidesPerView={5}>
        {movie &&
          movie.map((items, id) => {
            return (
              <>
                <SwiperSlide key={id}>
                  <div className="movie-card" key={items.id}>
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

export default Similar;
