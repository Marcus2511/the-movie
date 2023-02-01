import React, { useEffect, useState } from "react";
import tmdbApi, { category, movieType } from "../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import background from "../components/assets/footer_img.jpg";
import youtube from "../components/assets/youtube.png";
import "./Searchmovie.css";
import { async } from "@firebase/util";

const Searchmovie = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const [keywords, setKeywords] = useState("");
  const [search, setSearch] = useState();
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState(true);
  useEffect(() => {
    const params = {};
    const getlist = async () => {
      try {
        const res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
        setItem(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    getlist();
  }, [condition]);

  const handlechange = (e) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    setQuery(keywords);
  };

  const getmovielist = async () => {
    const params = { query };
    try {
      const response = await tmdbApi.search(category.movie, {
        params,
      });
      setSearch(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keywords.length > 0 ? getmovielist() : setCondition(!condition);
  }, [query]);

  const handlesearch = () => {
    setItem(search);
  };
  return (
    <div className="searchmovie-wraper">
      <div className="searchmovie-header">
        <h3>Movie</h3>
      </div>
      <div className="searchmovie-container">
        <div className="searchmovie-movies">
          <form className="searchmovie-searchbox" onSubmit={e => { e.preventDefault(); }}>
            <input
              type="text"
              placeholder="Enter keyword"
              onChange={handlechange}
              value={keywords}
            />
            <button type="button" onClick={handlesearch}>Search</button>
          </form>
          <div className="base-movie">
            {item?.map((item, index) => {
              return (
                <span className="movies-postersearch" key={index}>
                  <img
                    src={apiConfig.w500Image(item.poster_path)}
                    alt="/"
                  ></img>
                  <img src={youtube} alt="/" className="youtube small" onClick={() => {
                        navigate(`/movie/${item.id}`);
                      }}/>
                  <h5>{item.title}</h5>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchmovie;
