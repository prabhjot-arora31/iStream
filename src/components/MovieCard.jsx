import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ data, getMovieDetail }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
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
            top: 0,
          }}
        >
          HD
        </h3>
        <img
          src={data.Thumbnail}
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
