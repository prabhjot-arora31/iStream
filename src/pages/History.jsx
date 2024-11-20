import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

const History = ({ getMovieDetail }) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("movies") || [])
  );
  const deleteInidividualMovie = (id) => {
    // history.find((ele) => ele.Id === id)
    const filteredItems = history.filter((item) => item.Id !== id);
    localStorage.setItem("movies", JSON.stringify(filteredItems));
  };

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
          Delete All
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
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <MovieCard data={ele} getMovieDetail={getMovieDetail} />
                <button
                  onClick={() => {
                    deleteInidividualMovie(ele.Id);
                  }}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    position: "relative",
                    top: "-14px",
                    padding: "0.6rem",
                    borderRadius: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <h3>Empty!!</h3>
        )}
      </div>
    </div>
  );
};

export default History;
