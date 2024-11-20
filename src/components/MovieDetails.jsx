import React, { useEffect } from "react";
import "./MovieDetails.css";

const MovieDetails = ({ MovieDetail }) => {
  // Fetch and parse movies from localStorage safely
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  // Default to the first movie in localStorage if no MovieDetail is provided
  const movieToRender =
    Object.keys(MovieDetail).length > 0
      ? MovieDetail
      : movies[movies.length - 1];

  useEffect(() => {
    console.log("movie detail:", movieToRender);

    return () => {};
  }, []);

  // Handle the case where no movie is available
  if (!movieToRender) {
    return (
      <p>No movie details available. Please add movies to localStorage.</p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <img
          src={
            movieToRender.Cover?.includes("themoviedb")
              ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
              : movieToRender.Cover ||
                "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }
          alt="Movie Cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "70%",
          }}
        />
      </div>

      {/* Movie Player */}
      <div
        style={{
          height: "500px",
          maxWidth: "880px",
          margin: "0 auto",
          position: "relative",
          top: "18px",
        }}
      >
        <iframe
          src={movieToRender.Watch}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            borderRadius: "8px",
          }}
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Movie Details */}
      <div style={{ marginLeft: "0.6rem", marginTop: "1.7rem" }}>
        <h1
          className="title"
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            width: "fit-content",
          }}
        >
          {movieToRender.Title}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "800px",
          }}
        >
          <p
            style={{
              fontSize: "16.3px",
              fontWeight: "500",
              marginBottom: "25px",
            }}
          >
            {movieToRender.Description}
          </p>
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
            {movieToRender.Release} | {movieToRender.Duration} min |{" "}
            {movieToRender.Country}
          </div>
        </div>

        {/* Genres */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {movieToRender.Genre?.split(",").map((genre, id) => (
            <div
              key={id}
              style={{
                padding: "0.4rem",
                backgroundColor: "red",
                color: "white",
                marginTop: "0.9rem",
              }}
            >
              <p style={{ margin: 0 }}>{genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
