import React, { useEffect, useState } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import unknown1 from "../assets/unknown.jpg";
import "./Cast.css";

const Cast = ({ id, category }) => {
  const [cast, setCast] = useState();
  useEffect(() => {
    const getcast = async () => {
      const response = await tmdbApi.credits(category, id);
      const res = response.cast.slice(0,6)
      setCast(res)
    };
    getcast();
  }, [category, id]);
  return (
    <div className="cast">
      <div className="cast-wraper">
        {cast?.map((item) => {
          return (
            <div className="cast-info">
              <img src={apiConfig.w500Image(item?.profile_path)} alt="" />
              <h4>{item?.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cast;
