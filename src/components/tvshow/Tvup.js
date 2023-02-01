import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category, tvType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import youtube from "../../components/assets/youtube.png";
import "./Tv.css";
import { UserAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Tvup = () => {
  const [tvshow, setTvshow] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const params = {};
    const getTvOnAir = async () => {
      const res = await tmdbApi.getTvList(tvType.on_the_air, { params });
      setTvshow(res.results);
    };
    getTvOnAir();
  }, []);
  return (
    <div className="tv-list">
      <Swiper spaceBetween={10} slidesPerView={5}>
        {tvshow &&
          tvshow.map((items, index) => {
            return (
              <>
                <SwiperSlide key={index}>
                  <div className="tv-card" key={index + 1}>
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

export default Tvup;
