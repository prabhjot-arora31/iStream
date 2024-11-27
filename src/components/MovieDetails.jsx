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
        // `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/movie/${id}`
        `
        https://www.omdbapi.com/?i=${id}&apikey=2d70fb93`
      );
      setMovieToRender(data);
      // if (data.result[0]) {
      //   fetchRecommendedMovies(data.result[0].Id);
      // }
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
            movieToRender?.Poster?.includes("themoviedb")
              ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
              : movieToRender?.Poster ||
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
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid black",
              borderRadius: "8px",
            }}
            allowFullScreen // Correct attribute
            scrolling="no"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            src={
              movieToRender?.Type === "movie"
                ? `https://vidsrc.xyz/embed/movie/${id}`
                : `https://vidsrc.xyz/embed/tv/${id}/1/1`
            }
          ></iframe>
        </div>

        {/* Movie Details */}
        <div style={{ marginTop: "2.12462rem" }}>
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
            {movieToRender?.Plot || "No description available."}
          </p>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem" /* Adjusted font-size */,
            }}
          >
            Writer: {movieToRender?.Writer || "Unknown"}
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem" /* Adjusted font-size */,
            }}
          >
            Director: {movieToRender?.Director || "Unknown"}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Cast: {movieToRender?.Actors || "Not listed"}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {movieToRender?.Released} | {movieToRender?.Runtime} |{" "}
            {movieToRender?.Country}
          </div>
          {/* Language */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.8rem",
              alignItems: "center",
              marginTop: "0.6rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Language: {movieToRender?.Language}
            </span>{" "}
          </div>
          {/* Awards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.8rem",
              alignItems: "center",
              marginTop: "0.6rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Awards: {movieToRender?.Awards}
            </span>
            {/* <span style={{ fontWeight: "500" }}></span> */}
          </div>
          {/* Rating */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.8rem",
              alignItems: "center",
              marginTop: "0.6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                class="ipc-icon ipc-icon--star sc-d541859f-4 LNYqq"
                viewBox="0 0 24 24"
                fill="orange"
                role="presentation"
              >
                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
              </svg>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {movieToRender?.imdbRating}
              </span>
              /10{" "}
            </div>
            <span style={{ fontSize: "16.4px", fontWeight: "500" }}>
              ({movieToRender?.imdbVotes})
            </span>
          </div>

          {/* Seasons */}
          {movieToRender?.Type == "series" && (
            <div style={{ marginTop: "0.6rem", marginBottom: "0.6rem" }}>
              <span style={{ fontWeight: "500", fontSize: "18px" }}>
                Total Seasons:{" "}
              </span>
              <span style={{ fontWeight: "900", fontSize: "18px" }}>
                {movieToRender?.totalSeasons}
              </span>
            </div>
          )}
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
      {/* <div style={{ marginTop: "50px", position: "relative", zIndex: 1 }}>
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
      </div> */}
    </div>
  );
};

export default MovieDetails;
