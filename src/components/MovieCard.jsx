import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieCard = ({ data, getMovieDetail }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // For instant scrolling, though "instant" is not a valid value
        });
        getMovieDetail(data);
        navigate("/detail/" + data.Id);
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        if (movies.find((movie) => movie.Id === data.Id)) return;
        movies.push(data);
        localStorage.setItem("movies", JSON.stringify(movies));
      }}
      style={{
        cursor: "pointer",
        maxWidth: "180px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <h3
          style={{
            marginTop: 0,
            position: "absolute",
            backgroundColor: "yellow",
            right: 0,
            paddingLeft: "0.2rem",
            paddingRight: "0.2rem",
            paddingTop: "0.1rem",
            paddingBottom: "0.1rem",
            top: 0,
          }}
        >
          HD
        </h3>
        <img
          src={
            data.Thumbnail || !data.Thumbnail?.includes("themoviedb")
              ? data.Thumbnail
              : "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }
          style={{ width: "100%", objectFit: "cover" }}
        />
      </div>
      <h3 style={{ marginTop: "5px", textAlign: "center" }}>
        {data.Title.length > 15
          ? data.Title.substring(0, 15) + "..."
          : data.Title}
      </h3>
    </div>
  );
};

export default MovieCard;
