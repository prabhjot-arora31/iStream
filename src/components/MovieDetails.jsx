import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { Puff } from "react-loading-icons";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

const MovieDetails = ({ getMovieDetail, MovieDetail }) => {
  const { id } = useParams(); // Get movie ID from route params
  const [movieToRender, setMovieToRender] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedMovieLoading, setRecommendedMovieLoading] = useState(false);
  const [hoveredDiv, setHoveredDiv] = useState(0);

  // Fetch Movie Details by ID
  const fetchById = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/movie/${id}`
      );
      setMovieToRender(data.result[0] || MovieDetail);
      if (data.result[0]) {
        fetchRecommendedMovies(data.result[0].Id);
      }
    } catch (error) {
      setMovieToRender(MovieDetail);
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Recommended Movies
  const fetchRecommendedMovies = async (movieId) => {
    try {
      setRecommendedMovieLoading(true);
      const { data } = await axios.get(
        `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/recommendations/${movieId}`
      );
      setRecommendedMovies(data.result.data || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setRecommendedMovieLoading(false);
    }
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  if (isLoading) {
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
    <div
      style={{
        display: "flex",
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
          background: `linear-gradient(
          rgba(0, 0, 0, 0.7), /* Top - darker */
          rgba(0, 0, 0, 0.3) /* Bottom - lighter */
        )`,
          overflow: "hidden",
        }}
      >
        <img
          src={
            movieToRender?.Thumbnail?.includes("themoviedb")
              ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
              : movieToRender?.Thumbnail ||
                "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }
          alt="Movie Cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Content Inside the Background Image */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "1rem",
          color: "black",
          maxWidth: "880px",
          margin: "0 auto",
          width: "90%", // Added for responsiveness
          textAlign: "center", // Better alignment on smaller screens
        }}
      >
        {/* Movie Player */}
        <div
          style={{
            height: "400px",
            margin: "0 auto",
            position: "relative",
            top: "18px",
            width: "100%",
            maxWidth: "100%", // Ensures iframe scales
          }}
        >
          <iframe
            src={movieToRender?.Watch}
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
        <div style={{ marginTop: "1.7rem" }}>
          <h1
            className="title"
            style={{
              fontWeight: "bolder",
              fontSize: "1.5rem" /* Adjusted font-size */,
            }}
          >
            {movieToRender?.Title}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "500" /* Adjusted font-size */,
            }}
          >
            {movieToRender?.Description || "No description available."}
          </p>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem" /* Adjusted font-size */,
            }}
          >
            Director: {movieToRender?.Director || "Unknown"}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Cast: {movieToRender?.Actor || "Not listed"}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {movieToRender?.Release} | {movieToRender?.Duration} min |{" "}
            {movieToRender?.Country}
          </div>

          {/* Genres */}
          <div
            style={{
              marginTop: "0.57rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            {movieToRender?.Genre?.split(",").map((genre, idx) => (
              <div
                key={idx}
                style={{
                  padding: "0.4rem",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "0.9rem", // Smaller font size for mobile
                }}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Movies */}
      <div style={{ marginTop: "50px", position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center" }}>You may also like</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.7rem",
          }}
        >
          {recommendedMovieLoading ? (
            <Puff stroke="#ff0000" strokeOpacity={20.125} speed={0.75} />
          ) : recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie, idx) => (
              <MovieCard
                id={idx}
                setHoveredDiv={setHoveredDiv}
                hoveredDiv={hoveredDiv}
                data={movie}
                key={idx}
                getMovieDetail={getMovieDetail}
              />
            ))
          ) : (
            <p>No recommendations found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
