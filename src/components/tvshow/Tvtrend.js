import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category, tvType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { v4 as uuid } from "uuid";
import youtube from "../../components/assets/youtube.png";
import "./Tv.css";
import { UserAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Tvtrend = () => {
  const [tvshow, setTvshow] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const params = {};
    const getTvtrend = async () => {
      const response = await tmdbApi.getTvList(tvType.top_rated, { params });
      setTvshow(response.results);
    };
    getTvtrend();
  }, []);
  return (
    <div className="tv-list">
      <Swiper spaceBetween={10} slidesPerView={5}>
        {tvshow &&
          tvshow.map((items, index) => {
            return (
              <>
                <SwiperSlide key={uuid()}>
                  <div className="tv-card" key={index}>
                    <img
                      src={apiConfig.w500Image(items.poster_path)}
                      alt="/"
                    ></img>
                    <img
                      src={youtube}
                      alt="/"
                      className="youtube small"
                      onClick={() => {
                        navigate(`/tv/${items.id}`);
                      }}
                    />
                    <div className="tv-title">{items.name}</div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Tvtrend;
