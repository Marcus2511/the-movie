import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/Authcontext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import apiConfig from "../api/apiConfig";
import youtube from "../components/assets/youtube.png";
import tick from "../components/assets/tick.png";
import "./Account.css";
import background from "../components/assets/background.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { category } from "../api/tmdbApi";
import { async } from "@firebase/util";

const Account = () => {
  const [movie, setMovie] = useState([]);
  const [remove, setRemove] = useState(false);
  const { user } = UserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovie(doc.data()?.savedShows);
    });
  }, [user?.email]);
 
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteshow = async (passedid) => {
    setRemove(true);
    setTimeout(() => {
      setRemove(false);
    }, 2000);
    try {
      const res = movie.filter((item) => item.id !== passedid);
      await updateDoc(movieRef, {
        savedShows: res,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="collection-added-wraper">
        <h2>Your list</h2>
        <img src={background} alt="/"></img>
        <div className={remove ? "notify" : "notify dissapear"}>
          <img src={tick} className="tick" />
          <h5>You successfully removed from your favorite</h5>
        </div>
      </div>
      <div className="collection-added-component">
        {movie?.map((item) => {
          return (
            <div className="collection-added" key={item.id}>
              <div className="collection-image">
                <img
                  src={apiConfig.w500Image(item.poster)}
                  alt="/"
                  onClick={() => navigate(`/${item.category}/${item.id}`)}
                ></img>
              </div>
              <div className="collection-info">
                <h5>{item.title}</h5>
                <button
                  onClick={() => deleteshow(item.id)}
                  className="btn-remove"
                >
                  Remove collection
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Account;
