import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

const History = ({ getMovieDetail }) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("movies") || [])
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.8rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ textAlign: "center" }}>History</h3>
        <button
          onClick={() => {
            localStorage.setItem("movies", JSON.stringify([]));
          }}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0.6rem",
            cursor: "pointer",
            borderRadius: "0.3rem",
          }}
        >
          Delete
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.7rem",
          flexWrap: "wrap",
        }}
      >
        {history.length > 0 ? (
          history.reverse().map((ele, id) => {
            return <MovieCard data={ele} getMovieDetail={getMovieDetail} />;
          })
        ) : (
          <h3>Empty!!</h3>
        )}
      </div>
    </div>
  );
};

export default History;
