import React, { useEffect, useState } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./Video.css"

const Video = ({ id, category }) => {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const getmovie = async () => {
      const response = await tmdbApi.getVideos(category, id);
      const res=response?.results.slice(0,4)
      setMovie(res);
    };
    getmovie();
  });
  return (
    <div className="video-wraper">
      {movie?.map((item) => {
        return (
          <div className="video-name">
            <h3>{item.name}</h3>
            <iframe src={apiConfig.youtube(item.key)} />
          </div>
        );
      })}
    </div>
  );
};

export default Video;
