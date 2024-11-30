import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useNavigate, useParams } from "react-router-dom";

const RecommendedMovies = () => {
  const { movie } = useParams();
  const [movieInfo, setMovie] = useState({});
  const [recommendedMovieLoading, setRecommendedMovieLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rbHover, setRbHover] = useState(false);
  async function recommendedMovieCall(movieToRender) {
    if (!movieToRender) return;

    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const tastediveURL = "https://tastedive.com/api/similar";
    const type = movieToRender?.Type === "movie" ? "movie" : "show";
    const query = `${corsProxy}${tastediveURL}?q=${movieToRender?.Title}&type=${type}&limit=5&k=1040827-iStreamW-E8459B8B`;

    try {
      const { data } = await axios.post(
        `https://i-stream-proxy-recommendation-server.vercel.app/similar/${movieToRender?.Title.replace('/:/g',' ')}/${type}`,
        {
          secret: "nb&%*4#GtyuiEWQA09%@!",
        }
      );
      console.log("Recommendations:", data);
      setRecommendedMovieLoading(false);
      setRMovies(data?.similar?.results || []);
      if (data?.similar?.results.length == 0)
        setRecommendationError("No recommendations");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendationError("No Result!!");
      setRecommendedMovieLoading(false);
      setRMovies([]);
    }
  }
  const navigate = useNavigate();

  const [rMovies, setRMovies] = useState(
    JSON.parse(localStorage.getItem("rMovies")) || []
  );
  const [recommendationError, setRecommendationError] = useState("");
  useEffect(() => {
    console.log("query is: ", movie);
    (async () => {
      try {
        const { data } = await axios.get(`
        https://www.omdbapi.com/?t=${movie}&apikey=2d70fb93
            `);
        console.log("yo:", data);
        setMovie(data);
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        if (movies.find((movie) => movie.Title === data.Title)) return;
        movies.push(data);
        localStorage.setItem("movies", JSON.stringify(movies));
      } catch (e) {
        console.log(e.message);
      }
    })();
    return () => {};
  }, [movie]);

  if (Object.keys(movieInfo).length > 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {" "}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -1,
            //   background: `linear-gradient(
            //   rgba(0, 0, 0, 0.7), /* Top - darker */
            //   rgba(0, 0, 0, 0.3) /* Bottom - lighter */
            // )`,
            overflow: "hidden",
          }}
        >
          {/* <img
        src={
          movieInfo?.Poster?.includes("themoviedb")
            ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
            : movieInfo?.Poster ||
              "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
        }
        alt="Movie Cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
        }}
      /> */}
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
            movieInfo?.Type === "movie"
              ? `https://vidsrc.xyz/embed/movie/${movieInfo?.imdbID}`
              : `https://vidsrc.xyz/embed/tv/${movieInfo?.imdbID}/1/1`
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
              {movieInfo?.Title}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  movieInfo?.Poster?.includes("themoviedb")
                    ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                    : movieInfo?.Poster ||
                      "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                }
                alt="Movie Cover"
                style={{
                  width: "140px",
                  height: "170px",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  maxWidth: "270px",
                  textAlign: "left",
                  // height: "130px",
                  height: "40%",
                  fontWeight: "500" /* Adjusted font-size */,
                }}
              >
                {movieInfo?.Plot || "No description available."}
              </p>
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1rem" /* Adjusted font-size */,
              }}
            >
              Writer: {movieInfo?.Writer || "Unknown"}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1rem" /* Adjusted font-size */,
              }}
            >
              Director: {movieInfo?.Director || "Unknown"}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Cast: {movieInfo?.Actors || "Not listed"}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {movieInfo?.Released} | {movieInfo?.Runtime} |{" "}
              {movieInfo?.Country}
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
                Language: {movieInfo?.Language}
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
                Awards: {movieInfo?.Awards}
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
                  {movieInfo?.imdbRating}
                </span>
                /10{" "}
              </div>
              <span style={{ fontSize: "16.4px", fontWeight: "500" }}>
                ({movieInfo?.imdbVotes})
              </span>
            </div>

            {/* Seasons */}
            {movieInfo?.Type == "series" && (
              <div style={{ marginTop: "0.6rem", marginBottom: "0.6rem" }}>
                <span style={{ fontWeight: "500", fontSize: "18px" }}>
                  Total Seasons:{" "}
                </span>
                <span style={{ fontWeight: "900", fontSize: "18px" }}>
                  {movieInfo?.totalSeasons}
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
              {movieInfo?.Genre?.split(",").map((genre, idx) => (
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
            {/* Recommendations */}
            {recommendedMovieLoading && (
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
            )}
            <div style={{ marginTop: "20px" }}>
              {!recommendedMovieLoading &&
                !rMovies?.length > 0 &&
                !recommendationError && (
                  <button
                    onClick={() => {
                      setRecommendedMovieLoading(true);
                      recommendedMovieCall(movieInfo);
                      localStorage.setItem("isRecommendedFetch", true);
                    }}
                    onMouseOver={() => {
                      setRbHover(true);
                    }}
                    onMouseOut={() => {
                      setRbHover(false);
                    }}
                    style={{
                      padding: "0.7rem",
                      borderRadius: "7px",
                      border: rbHover ? "1px solid purple" : "1px solid purple",
                      background: rbHover
                        ? "linear-gradient(to right , blue , purple)"
                        : "white",
                      color: rbHover ? "white" : "purple",
                      cursor: "pointer",
                    }}
                  >
                    Show Recommendations
                  </button>
                )}
              {recommendationError && (
                <h3 style={{ margin: 0, marginBottom: "0.4rem" }}>
                  No Recommendations!!
                </h3>
              )}
              {rMovies?.length > 0 && (
                <div style={{ marginTop: "2.6rem" }}>
                  <h3 style={{ margin: 0, marginBottom: "0.4rem" }}>
                    Recommendations!!
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {rMovies.map((ele, id) => {
                      return (
                        <button
                          style={{
                            cursor: "pointer",
                            backgroundColor: "orange",
                            padding: "0.45rem",
                            borderRadius: "10px",
                            border: "none",
                          }}
                          onClick={() => {
                            setMovie([]);
                            setRMovies([]);
                            navigate("/recommended/" + ele.name);
                          }}
                        >
                          {ele.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else
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
};

export default RecommendedMovies;
