import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import Cast from "../components/cast/Cast";
import Video from "../components/video/Video";
import Similar from "../components/similar/Similar";
import { UserAuth } from "../context/Authcontext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";
import tick from "../components/assets/tick.png";
import "./Detail.css";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [check, setCheck] = useState();
  const [add, setAdd] = useState("checking");
  const [remove, setRemove] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(true);
      setTimeout(() => {
        setLike(false);
      }, 2000);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          category: category,
          like: item.id,
          id: item.id,
          title: item.title || item.name,
          poster: item.poster_path,
        }),
      });
      setAdd("added");
    } else alert("Please login to use this feature");
  };
  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} });
      setItem(res);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCheck(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteshow = async (passedid) => {
    setRemove(true);
    setTimeout(() => {
      setRemove(false);
    }, 2000);
    try {
      const res = check?.filter((item) => item.id !== passedid);
      await updateDoc(movieRef, {
        savedShows: res,
      });
      setAdd("none");
    } catch (error) {
      console.log(error);
    }
  };

  const checcollection = () => {
    if (check != "") {
      const a = check?.find((index) => index?.id == item?.id);
      if (a != undefined) {
        setAdd("added");
      } else {
        setAdd("none");
      }
    } else {
      setAdd("none");
    }
  };

  useEffect(() => {
    setAdd("checking");
  }, [id]);

  console.log(add);
  return (
    <div className="detail-container">
      <div className="detail-backdrop">
        <img src={apiConfig.originalImage(item?.backdrop_path)} alt="/"></img>
        <div className={like ? "notify" : "notify dissapear"}>
          <img src={tick} className="tick" />
          <h5>You successfully added to your favorite</h5>
        </div>
        <div className={remove ? "notify" : "notify dissapear"}>
          <img src={tick} className="tick" />
          <h5>You successfully removed from your favorite</h5>
        </div>
      </div>
      <div className="detail-poster">
        <div className="detail-cover-poster">
          <img src={apiConfig.w500Image(item?.poster_path)} alt="/"></img>
        </div>
        <div className="detail-info">
          <div className="detail-info-wraper">
            <h1>{item?.title || item?.name}</h1>
            <div className="detail-genre">
              {item?.genres.map((genre) => (
                <span>{genre.name}</span>
              ))}
            </div>
            <div className="detail-rate">
              <h3>Status: {item?.status}</h3>
              <h3>Rate: {parseFloat(item?.vote_average).toFixed(2)} /10</h3>
            </div>
            <p>{item?.overview}</p>
            <div className="collection-button">
              <button
                onClick={saveShow}
                className={add === "none" ? "addbtn appear" : "addbtn appear"}
              >
                Add to collection
              </button>
              <button
                onClick={() => deleteshow(item.id)}
                className={add === "added" ? "rmbtn appear" : "rmbtn"}
              >
                Remove from your collection
              </button>
              <button
                onClick={checcollection}
                className={add === "checking" ? "checkbtn appear" : "checkbtn"}
              >
                Check your collection
              </button>
            </div>
            <h3>Cast</h3>
            <Cast id={item?.id} category={category} />
          </div>
        </div>
      </div>
      <Video id={item?.id} category={category} />
      <Similar id={item?.id} category={category} />
    </div>
  );
};

export default Detail;
