import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const ActorInfo = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDiv, setHoveredDiv] = useState("");
  const [actorProfile, setActorProfile] = useState(
    localStorage.getItem("actor-photo") || ""
  );
  useEffect(() => {
    const fetchIt = async () => {
      const { data } = await axios.get(
        `https://api.tmdb.org/3/person/${id}/combined_credits?api_key=ae4bd1b6fce2a5648671bfc171d15ba4`
      );
      console.log("hmm , data is:", data);
      setLoading(false);
      setMovies(data);
    };
    fetchIt();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => {};
  }, []);
  if (loading) {
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "30px",

          width: "80px",
          height: "80px",
        }}
      >
        <Puff
          stroke="#ff0000"
          strokeOpacity={20.125}
          speed={0.75}
          width={"100%"}
          height={"100%"}
        />
      </div>
    );
  }
  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "900", color: "white" }}>
        Filmography of {name}
      </h2>
      <button
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight, // Scroll to the bottom
            left: document.documentElement.scrollWidth, // Scroll to the right
            behavior: "smooth",
          });
        }}
        style={{
          color: "white",
          position: "fixed",
          right: "25px",
          bottom: "25px",
          zIndex: 20,
          backgroundColor: "red",
          border: "none",
          padding: "0.3rem 0.5rem",
          cursor: "pointer",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15L3 7H17L10 15Z" fill="black" />
        </svg>
      </button>
      {actorProfile && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              margin: "10px auto",
              width: "160px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={`https://image.tmdb.org/t/p/w500${actorProfile}`}
          />{" "}
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.7rem",
          flexWrap: "wrap",
        }}
      >
        {movies.cast.map((m, i) => {
          return (
            <MovieCard
              data={m}
              key={i}
              id={i}
              setHoveredDiv={setHoveredDiv}
              hoveredDiv={hoveredDiv}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.7rem",
          flexWrap: "wrap",
        }}
      >
        {movies.crew.map((m, i) => {
          return (
            <MovieCard
              data={m}
              key={i}
              id={i}
              setHoveredDiv={setHoveredDiv}
              hoveredDiv={hoveredDiv}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ActorInfo;
