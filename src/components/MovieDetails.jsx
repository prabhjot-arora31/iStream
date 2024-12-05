import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { Puff } from "react-loading-icons";
import MovieCard from "./MovieCard";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = ({ getMovieDetail, MovieDetail }) => {
  const { id, tv } = useParams(); // Get movie ID from route params
  const [idToUse, setIdToUse] = useState(id);
  const corsProxy = "https://cors-anywhere.herokuapp.com/";
  const tastediveURL = "https://tastedive.com/api/similar";
  const [movieToRender, setMovieToRender] = useState({});
  const [castHover, setCastHover] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [iFrameLoading, setIFrameLoading] = useState(false);
  const [credits, setCredits] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [mappingImdbIdToTmdbId, setMappingImdbIdToTmdbId] = useState();
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedMovieLoading, setRecommendedMovieLoading] = useState(false);
  const [hoveredDiv, setHoveredDiv] = useState(0);
  const navigate = useNavigate();
  const [rbHover, setRbHover] = useState(false);
  const [totalEpisodes, setTotalEpisodes] = useState([]);
  const [rMovies, setRMovies] = useState(
    JSON.parse(localStorage.getItem("rMovies")) || []
  );
  useEffect(() => {
    (async () => {
      if (tv?.length > 0) {
        setTotalEpisodes([]);
        const { data } = await axios.get(
          `https://api.tmdb.org/3/tv/${mappingImdbIdToTmdbId}/season/${currentSeason}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US`
        );
        console.log("for episode: ", data);
        setTotalEpisodes(data.episodes);
      }
    })();
    return () => {};
  }, [currentSeason]);

  const [recommendationError, setRecommendationError] = useState("");
  async function recommendedMovieCall(movieToRender) {
    if (!movieToRender) return;

    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const tastediveURL = "https://tastedive.com/api/similar";
    const type = movieToRender?.Type === "movie" ? "movie" : "show";
    const query = `${corsProxy}${tastediveURL}?q=${movieToRender?.Title}&type=${type}&limit=5&k=1040827-iStreamW-E8459B8B`;

    try {
      const { data } = await axios.post(
        `https://i-stream-proxy-recommendation-server.vercel.app/similar/${movieToRender?.Title.replace(
          /:/g,
          " "
        )}/${type}`,
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
  const [createdBy, setCreatedBy] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [vote, setVote] = useState("");
  // Fetch Movie Details by ID
  const fetchById = async () => {
    try {
      const apiKey = "2d70fb93";
      setIsLoading(true);
      let url;
      let imdbId = idToUse;

      // Determine if we need to fetch IMDb ID from TMDB
      if (!idToUse?.startsWith("tt")) {
        // TMDB ID search
        console.log("Fetching IMDb ID from TMDB...");
        var tmdbUrl;
        if (tv?.length > 0) {
          tmdbUrl = `https://api.tmdb.org/3/tv/${id}/external_ids?api_key=fafef439971c0bedf1c12e7a5be971c2`;
          const { data } = await axios.get(
            `https://api.tmdb.org/3/tv/${id}/season/${currentSeason}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US`
          );

          console.log("for episode: ", data);
          setTotalEpisodes(data.episodes);
        } else {
          console.log("tv length is:", tv?.length);
          tmdbUrl = `https://api.tmdb.org/3/movie/${id}?api_key=fafef439971c0bedf1c12e7a5be971c2`;
        }
        const { data: tmdbData } = await axios.get(tmdbUrl);
        console.log("ACTUAL TMDB DATA:", tmdbData);
        imdbId = tmdbData.imdb_id; // Extract IMDb ID
        setCreatedBy(tmdbData.created_by);
        setProductionCompanies(tmdbData.production_companies);
        setVote(tmdbData.vote_average);
        console.log("real data:", tmdbData);
        console.log("created by: " + tmdbData.created_by);
        setIdToUse(imdbId); // Update `idToUse`
      } else {
        if (tv?.length > 0) {
          // tmdbUrl = `https://api.tmdb.org/3/tv/${id}/external_ids?api_key=fafef439971c0bedf1c12e7a5be971c2`;
          const data1 = await axios.get(
            `https://api.tmdb.org/3/find/${id}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&external_source=imdb_id`
          );
          console.log("hihaa 😂:", data1);
          setMappingImdbIdToTmdbId(data1?.data?.tv_results[0]?.id);
          const { data } = await axios.get(
            `https://api.tmdb.org/3/tv/${data1?.data?.tv_results[0]?.id}/season/1?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US`
          );
          console.log("for episode: ", data);
          setTotalEpisodes(data.episodes);
        }
      }

      // Fetch movie details from OMDB
      url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`;
      console.log("Fetching movie details from OMDB...");
      const { data } = await axios.get(url);
      const creditData = await axios.get(
        `https://api.tmdb.org/3/movie/${id}/credits?api_key=fafef439971c0bedf1c12e7a5be971c2`
      );
      setCredits(creditData?.data?.cast);
      console.log("credits are:", creditData);
      // Update state with fetched movie data
      setMovieToRender(data);
      let movies = JSON.parse(localStorage.getItem("movies")) || [];
      if (movies.find((movie) => movie.imdbID === data.imdbID)) return;
      movies.push(data);
      localStorage.setItem("movies", JSON.stringify(movies));
      console.log("Movie data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setMovieToRender(MovieDetail); // Fallback movie details
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchById();
    // Only trigger `fetchById` on the initial render or when `id` changes
    // Do not depend on `idToUse` here to avoid infinite loop
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
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "1rem",
          color: "black",
          // Added for responsiveness
          textAlign: "center", // Better alignment on smaller screens
        }}
      >
        {/* Movie Player */}
        {movieToRender?.Type != "game" && (
          <div
            style={{
              position: "relative",
              top: "18px",
              marginBottom: "3.2rem",
            }}
          >
            {
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap-reverse",
                  gap: "2.5rem",
                }}
              >
                {!iFrameLoading ? (
                  <iframe
                    style={{
                      // width: "100%",
                      // height: "100%",
                      width: "420px",
                      height: "420px",
                      border: "1px solid black",
                      borderRadius: "8px",
                    }}
                    allowFullScreen // Correct attribute
                    scrolling="no"
                    allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    src={
                      movieToRender?.Type === "movie"
                        ? `https://vidsrc.xyz/embed/movie/${id}`
                        : `https://vidsrc.xyz/embed/tv/${id}/${currentSeason}/${currentEpisode}`
                    }
                  ></iframe>
                ) : (
                  <div
                    style={{
                      width: "420px",
                      height: "420px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Puff
                      stroke="#ff0000"
                      strokeOpacity={20.125}
                      speed={0.75}
                      width="50px"
                      height="50px"
                    />
                  </div>
                )}
                <div>
                  <h1
                    className="title"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "2rem" /* Adjusted font-size */,
                    }}
                  >
                    {movieToRender?.Title ||
                      movieToRender?.title ||
                      movieToRender?.name}
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
                        movieToRender?.Poster
                          ? movieToRender?.Poster?.includes("themoviedb")
                            ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                            : movieToRender?.Poster ||
                              "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                          : "https://image.tmdb.org/t/p/w500" +
                            movieToRender?.poster_path
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
                      {movieToRender?.Plot ||
                        movieToRender?.overview ||
                        "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
        {/* TV Shows Seasons and Episodes */}
        {Array.from(
          { length: movieToRender?.totalSeasons },
          (_, index) => index
        ) &&
          Array.from(
            { length: movieToRender?.totalSeasons },
            (_, index) => index
          ).length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Seasons: </p>

              {Array.from(
                { length: movieToRender?.totalSeasons },
                (_, index) => index
              ).map((season, i) => {
                return (
                  <button
                    style={{
                      backgroundColor:
                        currentSeason == i + 1 ? "purple" : "white",
                      border:
                        currentSeason != i + 1
                          ? "2px solid purple"
                          : "2px solid purple",
                      padding: "0.7rem",
                      borderRadius: "0.34rem",
                      cursor: "pointer",
                      color: currentSeason == i + 1 ? "white" : "black",
                    }}
                    onClick={() => {
                      setCurrentSeason(season + 1);
                      setIFrameLoading(true);
                      setTimeout(() => {
                        setIFrameLoading(false);
                      }, 300);
                    }}
                  >
                    {season + 1}
                  </button>
                );
              })}
            </div>
          )}
        {totalEpisodes &&
        movieToRender?.totalSeasons?.length > 0 &&
        totalEpisodes.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Episodes: </p>
            {totalEpisodes.map((episode, id) => {
              return (
                <button
                  style={{
                    backgroundColor:
                      currentEpisode == episode.episode_number
                        ? "purple"
                        : "white",
                    border: "2px solid purple",
                    padding: "0.7rem",
                    borderRadius: "0.34rem",
                    cursor: "pointer",
                    color:
                      currentEpisode == episode.episode_number
                        ? "white"
                        : "black",
                  }}
                  onClick={() => {
                    setCurrentEpisode(episode.episode_number);
                    setIFrameLoading(true);
                    setTimeout(() => {
                      setIFrameLoading(false);
                    }, 1000);
                  }}
                >
                  {episode.episode_number}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              margin: "0 auto",
              marginTop: "30px",

              width: "80px",
              height: movieToRender?.totalSeasons?.length > 0 ? "80px" : 0,
            }}
          >
            {movieToRender?.totalSeasons?.length > 0 && (
              <Puff
                stroke="#ff0000"
                strokeOpacity={20.125}
                speed={0.75}
                width={"100%"}
                height={"100%"}
              />
            )}
          </div>
        )}
        {/* Movie & TV Shows Details */}
        <div style={{ marginTop: "2.12462rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {createdBy && createdBy.length > 0 && (
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem" /* Adjusted font-size */,
                }}
              >
                Created By{" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontWeight: 500,
                    fontSize: "1rem",
                    margin: "0.4rem 0",
                    flexWrap: "wrap",
                  }}
                >
                  {movieToRender?.createdBy.map((creator, id) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          width={"60px"}
                          src={
                            "https://image.tmdb.org/t/w500" +
                            creator.profile_path
                          }
                        />
                        <span
                          style={{
                            margin: 0,
                            fontSize: "0.86rem",
                            width: "50px",
                            textAlign: "center",
                            fontWeight: "400",
                          }}
                        >
                          {actor}
                        </span>
                      </div>
                    );
                  }) || "Not listed"}
                </div>
              </div>
            )}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem" /* Adjusted font-size */,
              }}
            >
              Writer <br />
              <span style={{ fontSize: "1rem", fontWeight: "400" }}>
                {movieToRender?.Writer || "Unknown"}
              </span>
            </div>
            <div
              style={{
                width: "3.3px",
                height: "36px",
                backgroundColor: "gray",
              }}
            ></div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem" /* Adjusted font-size */,
              }}
            >
              Director <br />
              <span style={{ fontSize: "1rem", fontWeight: "400" }}>
                {movieToRender?.Director || "Unknown"}
              </span>
            </div>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" /* Adjusted font-size */,
              margin: "1.7rem 0",
            }}
          >
            Cast{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.6rem",
                fontWeight: 500,
                fontSize: "1rem",
                margin: "0.4rem 0",
                flexWrap: "wrap",
              }}
            >
              {credits.slice(0, 10).map((actor, id) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.4rem",
                      cursor: "pointer",
                      borderRadius: "0.6rem",
                      transition: "0.2s ease-in-out",
                      backgroundColor: castHover == id ? "lightgray" : "white",
                      transform: castHover == id ? "scale(1.04)" : "scale(1)",
                    }}
                    onMouseOver={() => {
                      setCastHover(id);
                    }}
                    onMouseLeave={() => {
                      setCastHover();
                    }}
                  >
                    <img
                      width={"90px"}
                      style={{ borderRadius: "0.6rem" }}
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    />
                    <span
                      style={{
                        fontSize: "0.86rem",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop:'0.23rem'
                      }}
                    >
                      {actor.name}
                    </span>
                    <span
                      style={{
                        margin: 0,
                        fontSize: "0.77rem",
                        color: "gray",
                        textAlign: "center",
                        fontWeight: "normal",
                      }}
                    >
                      {actor.character}
                    </span>
                  </div>
                );
              }) || "Not listed"}
            </div>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" /* Adjusted font-size */,
              margin: "1.89rem 0",
            }}
          >
            {movieToRender?.Released} | {movieToRender?.Runtime} |{" "}
            {movieToRender?.Country}
          </div>
          {/* Language */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" /* Adjusted font-size */,
              marginTop: "0.7rem",
            }}
          >
            Language <br />
            <span style={{ fontSize: "1rem", fontWeight: "400" }}>
              {movieToRender?.Language || "Unknown"}
            </span>
          </div>
          {/* Awards */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" /* Adjusted font-size */,
              margin: "0.7rem 0",
            }}
          >
            Awards <br />
            <span style={{ fontSize: "1rem", fontWeight: "400" }}>
              {movieToRender?.Awards || "Unknown"}
            </span>
          </div>
          {/* Production Companies */}
          {productionCompanies && productionCompanies.length > 0 && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem" /* Adjusted font-size */,
                margin: "0.7rem 0",
              }}
            >
              Production Companies <br />
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",

                  flexWrap: "wrap",
                }}
              >
                {productionCompanies.map((productionCompany, id) => {
                  return (
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "lightgray",
                        padding: "0.6rem",
                        gap: "0.2rem",
                        display: "flex",
                        marginTop: "0.8rem",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" +
                          productionCompany.logo_path
                        }
                        width={"60px"}
                      />
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "400",
                          margin: 0,
                        }}
                      >
                        {productionCompany.name}
                      </h4>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {/* Rating */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.8rem",
              alignItems: "center",
              margin: "0.6rem 0",
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
                {vote?.toString().substring(0, 3) || movieToRender?.imdbRating}
              </span>
              &nbsp; /10{" "}
            </div>
            <span style={{ fontSize: "16.4px", fontWeight: "500" }}>
              ({movieToRender?.imdbVotes})
            </span>
          </div>

          {/* Seasons */}
          {/* {movieToRender?.Type == "series" && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem" 
                margin: "0.9rem 0",
              }}
            >
              Total Seasons <br />
              <span style={{ fontSize: "1rem", fontWeight: "500" }}>
                {movieToRender?.totalSeasons || "Unknown"}
              </span>
            </div>
          )} */}
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
              <button
                key={idx}
                style={{
                  padding: "0.4rem",
                  backgroundColor: "red",
                  color: "white",
                  border:'none',
                  fontSize: "0.9rem", // Smaller font size for mobile
                }}
              >
                {genre}
              </button>
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
                    recommendedMovieCall(movieToRender);
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
                          navigate("/recommended/" + ele.name);
                          let movies =
                            JSON.parse(localStorage.getItem("movies")) || [];
                          if (
                            movies.find((movie) => movie.imdbID === data.imdbID)
                          )
                            return;
                          movies.push(data);
                          localStorage.setItem(
                            "movies",
                            JSON.stringify(movies)
                          );
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
