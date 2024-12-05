import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { Puff } from "react-loading-icons";
import MovieCard from "./MovieCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MovieDetails = ({ getMovieDetail, MovieDetail }) => {
  const { id, tv } = useParams(); // Get movie ID from route params
  const [idToUse, setIdToUse] = useState(id);
  const corsProxy = "https://cors-anywhere.herokuapp.com/";
  const tastediveURL = "https://tastedive.com/api/similar";
  const [movieToRender, setMovieToRender] = useState({});
  const [castHover, setCastHover] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [iFrameLoading, setIFrameLoading] = useState(false);
  const [tmdbId, setTmdbId] = useState("");
  const [credits, setCredits] = useState([]);
  const [crew, setCrew] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [mappingImdbIdToTmdbId, setMappingImdbIdToTmdbId] = useState();
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedMovieLoading, setRecommendedMovieLoading] = useState(true);
  const [hoveredDiv, setHoveredDiv] = useState(0);
  const location = useLocation();
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
          `https://api.tmdb.org/3/tv/${id}/season/${currentSeason}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US`
        );
        console.log("for episode: ", data);
        setTotalEpisodes(data.episodes.length);
      }
    })();
    return () => {};
  }, [currentSeason]);

  const [recommendationError, setRecommendationError] = useState("");
  async function recommendedMovieCall() {
    //alert("called occur");
    try {
      if (id?.startsWith("tt")) {
        //alert("I am in tt");
        if (tv?.length > 0) {
          const data1 = await axios.get(
            `https://api.tmdb.org/3/find/${id}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&external_source=imdb_id`
          );
          console.log("hihaa 😂:", data1);
          setIdToUse(data1?.data?.tv_results[0]?.id);
          console.log("setting id:", idToUse);
          if (data1?.data?.tv_results[0]?.id) {
            setRecommendedMovieLoading(true);
            setRMovies([]);
            //console.log("mapping:", idToUse);
            const { data } = await axios.get(
              `https://api.tmdb.org/3/tv/${data1?.data?.tv_results[0]?.id}/recommendations?api_key=fafef439971c0bedf1c12e7a5be971c2&page=1`
            );
            console.log("data is: ", data);
            setRMovies(data.results);
            setRecommendedMovieLoading(false);
          }
        } else {
          const data1 = await axios.get(
            `https://api.tmdb.org/3/find/${id}?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&external_source=imdb_id`
          );
          console.log("hihaa 😂:", data1);
          console.log("id is:", data1?.data?.movie_results[0]?.id);
          setIdToUse(data1?.data?.movie_results[0]?.id);
          console.log("setting id:", idToUse);
          if (data1?.data?.movie_results[0]?.id) {
            setRecommendedMovieLoading(true);
            setRMovies([]);
            //console.log("mapping:", idToUse);
            const { data } = await axios.get(
              `https://api.tmdb.org/3/movie/${data1?.data?.movie_results[0]?.id}/recommendations?api_key=fafef439971c0bedf1c12e7a5be971c2&page=1`
            );
            console.log("data is: ", data);
            setRMovies(data.results);
            setRecommendedMovieLoading(false);
          }
        }
      } else {
        //alert("I am here");
        if (tv?.length > 0) {
          // alert("hmm");
          setRecommendedMovieLoading(true);
          setRMovies([]);
          //console.log("mapping:", idToUse);
          // alert(id);
          const { data } = await axios.get(
            `https://api.tmdb.org/3/tv/${id}/recommendations?api_key=fafef439971c0bedf1c12e7a5be971c2&page=1`
          );
          console.log("data is: ", data);
          setRMovies(data.results);
          setRecommendedMovieLoading(false);
        } else {
          setRecommendedMovieLoading(true);
          setRMovies([]);
          //console.log("mapping:", idToUse);
          const { data } = await axios.get(
            `https://api.tmdb.org/3/movie/${id}/recommendations?api_key=fafef439971c0bedf1c12e7a5be971c2&page=1`
          );
          console.log("data is: ", data);
          setRMovies(data.results);
          setRecommendedMovieLoading(false);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
    try {
    } catch (error) {
      //console.error("Error fetching recommendations:", error);
      setRecommendationError("No Result!!");
      setRecommendedMovieLoading(false);
      setRMovies([]);
    }
  }
  useEffect(() => {
    recommendedMovieCall();
    console.log("in effect: ", idToUse);
    return () => {};
  }, [location.pathname]);
  const [createdBy, setCreatedBy] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [vote, setVote] = useState("");
  // Fetch Movie Details by ID
  const fetchById = async () => {
    try {
      const apiKey = "2d70fb93"; // OMDB API Key (not required now for TMDB fetch)
      const tmdbKey = "8cf43ad9c085135b9479ad5cf6bbcbda"; // TMDB API Key
      setIsLoading(true);
      let imdbId = idToUse;
      let tmdbData = null;

      // Helper function to convert IMDb ID to TMDB ID
      const fetchTmdbIdFromImdb = async (imdbId, isTv) => {
        const url = `https://api.tmdb.org/3/find/${imdbId}?api_key=${tmdbKey}&language=en-US&external_source=imdb_id`;
        const { data } = await axios.get(url);

        if (isTv) {
          return data.tv_results[0]?.id;
        } else {
          return data.movie_results[0]?.id;
        }
      };

      // Fetch data for movies or TV shows using IMDb ID
      // alert("idtouse:", id);
      if (id && id?.startsWith("tt")) {
        // If the ID starts with "tt", fetch TMDB ID for the movie or TV show
        const tmdbId = await fetchTmdbIdFromImdb(imdbId, tv?.length > 0);
        setTmdbId(tmdbId);
        if (!tmdbId) {
          console.error("TMDB ID not found for IMDb ID:", imdbId);
          return;
        }

        // Now fetch movie or TV show details from TMDB using the TMDB ID
        const tmdbUrl =
          tv?.length > 0
            ? `https://api.tmdb.org/3/tv/${tmdbId}?api_key=${tmdbKey}&language=en-US`
            : `https://api.tmdb.org/3/movie/${tmdbId}?api_key=${tmdbKey}&language=en-US`;

        const { data } = await axios.get(tmdbUrl);
        tmdbData = data;

        // Update the state with TMDB data
        setMovieToRender(data);
        setCreatedBy(data.created_by);
        setProductionCompanies(data.production_companies);
        setVote(data.vote_average);

        // For TV shows, fetch season details
        if (tv?.length > 0) {
          const { data: seasonData } = await axios.get(
            `https://api.tmdb.org/3/tv/${tmdbId}/season/${currentSeason}?api_key=${tmdbKey}&language=en-US`
          );
          setTotalEpisodes(seasonData.episodes);
        }
      } else {
        // If it's not an IMDb ID, just proceed with the regular fetching
        const tmdbUrl =
          tv?.length > 0
            ? `https://api.tmdb.org/3/tv/${id}?api_key=${tmdbKey}&language=en-US`
            : `https://api.tmdb.org/3/movie/${id}?api_key=${tmdbKey}&language=en-US`;

        const { data } = await axios.get(tmdbUrl);
        tmdbData = data;
        console.log("data hmm is:", data);
        // Update the state with TMDB data
        setMovieToRender(data);
        setCreatedBy(data.created_by);
        setProductionCompanies(data.production_companies);
        setVote(data.vote_average);

        // For TV shows, fetch season details
        if (tv?.length > 0) {
          const { data: seasonData } = await axios.get(
            `https://api.tmdb.org/3/tv/${idToUse}/season/${currentSeason}?api_key=${tmdbKey}&language=en-US`
          );
          console.log("total episodes:", seasonData.episodes.length);
          setTotalEpisodes(seasonData.episodes.length);
        }
      }
    } catch (error) {
      console.error("Error fetching movie details:", error.message);
      setMovieToRender(MovieDetail); // Fallback data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchById();
    // Only run on `id` or `tv` changes to avoid unnecessary re-renders
  }, [id, tv, location.pathname]);

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
                  <>
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
                  </>
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
          { length: movieToRender?.number_of_seasons },
          (_, index) => index
        ) &&
          Array.from(
            { length: movieToRender?.number_of_seasons },
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
                { length: movieToRender?.number_of_seasons },
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
        movieToRender?.number_of_seasons > 0 &&
        totalEpisodes > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0 auto",
              width: "100%",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Episodes: </p>
            {Array.from({ length: totalEpisodes }, (_, index) => index).map(
              (episode, id) => {
                return (
                  <button
                    style={{
                      backgroundColor:
                        currentEpisode == id + 1 ? "purple" : "white",
                      border: "2px solid purple",
                      padding: "0.7rem",
                      borderRadius: "0.34rem",
                      cursor: "pointer",
                      color: currentEpisode == id + 1 ? "white" : "black",
                    }}
                    onClick={() => {
                      setCurrentEpisode(id + 1);
                      setIFrameLoading(true);
                      setTimeout(() => {
                        setIFrameLoading(false);
                      }, 1000);
                    }}
                  >
                    {id + 1}
                  </button>
                );
              }
            )}
          </div>
        ) : (
          <div
            style={{
              margin: "0 auto",

              width: "50px",
              height: movieToRender?.number_of_seasons > 0 ? "80px" : 0,
            }}
          >
            {movieToRender?.number_of_seasons > 0 && (
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
                  {movieToRender?.createdBy?.map((creator, id) => {
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

            {/* <div
              style={{
                width: "3.3px",
                height: "36px",
                backgroundColor: "gray",
              }}
            ></div> */}
          </div>
          {credits.length > 0 && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem" /* Adjusted font-size */,
                margin: "1.7rem 0",
                marginTop: 0,
              }}
            >
              Top Cast{" "}
              <div
                className="casts"
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  fontWeight: 500,
                  fontSize: "1rem",
                  margin: "0.4rem 0",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: "0.84rem",
                  overflow: "auto",
                }}
              >
                {credits.slice(0, 5).map((actor, id) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        padding: "0.4rem",
                        cursor: "pointer",
                        borderRadius: "0.6rem",
                        transition: "0.2s ease-in-out",
                        backgroundColor:
                          castHover == id ? "lightgray" : "white",
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
                        width={actor.profile_path ? "90px" : "100px"}
                        // height={"150px"}
                        height={!actor.profile_path && "110px"}
                        style={{ borderRadius: "0.6rem" }}
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                            : "https://imgs.search.brave.com/sE8MdXvDoqofUi5xFiPekWzRwNvt10-6tUkLkDA7KWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzE3LzEyLzIz/LzM2MF9GXzkxNzEy/MjM2N19rU3BkcFJK/NUhjbW4wczRXTWRK/YlNacGw3TlJ6d3Vw/VS5qcGc"
                        }
                      />
                      <span
                        style={{
                          fontSize: "0.86rem",
                          textAlign: "center",
                          fontWeight: "bold",
                          marginTop: "0.23rem",
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
          )}
          <div>
            <button
              style={{
                backgroundColor: "lightblue",
                cursor: "pointer",
                border: "none",
                borderRadius: "10px",
                padding: "0.9rem",
              }}
              onClick={() => {
                tv?.length > 0 && id.startsWith("tt")
                  ? navigate(`/cast-and-crew/${tmdbId}/tv`)
                  : tv?.length > 0 && !id.startsWith("tt")
                  ? navigate(`/cast-and-crew/${id}/tv`)
                  : navigate(`/cast-and-crew/${id}`);
              }}
            >
              Meet the Whole Team
            </button>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" /* Adjusted font-size */,
              margin: "1.89rem 0",
            }}
          >
            {movieToRender?.Released || movieToRender?.release_date} |{" "}
            {movieToRender?.Runtime || movieToRender?.runtime} min
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
              {movieToRender?.spoken_languages?.map((lang, id) => {
                return (
                  <>
                    {id != 0 && ", "}
                    {lang.english_name}
                  </>
                );
              }) || "Unknown"}
            </span>
          </div>
          {/* Awards */}
          {/* <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem" ,
              margin: "0.7rem 0",
            }}
          >
            Awards <br />
            <span style={{ fontSize: "1rem", fontWeight: "400" }}>
              {movieToRender?.Awards || "Unknown"}
            </span>
          </div> */}
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
            {movieToRender?.imdbVotes && (
              <span style={{ fontSize: "16.4px", fontWeight: "500" }}>
                ({movieToRender?.imdbVotes})
              </span>
            )}
          </div>

          {/* Seasons */}
          {/* {tv?.length > 0 && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
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
            {movieToRender?.genres?.map((genre, idx) => (
              <button
                key={idx}
                style={{
                  padding: "0.4rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  fontSize: "0.9rem", // Smaller font size for mobile
                }}
              >
                {genre.name}
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
            {/* {!recommendedMovieLoading &&
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
              )} */}
            {recommendationError && (
              <h3 style={{ margin: 0, marginBottom: "1.4rem" }}>
                No Recommendations!!
              </h3>
            )}
            {rMovies?.length > 0 && (
              <div style={{ marginTop: "2.6rem" }}>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "1.4rem",
                    fontSize: "24.2px",
                  }}
                >
                  You may also like....
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginTop: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  {rMovies.map((ele, id) => {
                    return (
                      <MovieCard
                        data={ele}
                        key={id}
                        id={id}
                        setHoveredDiv={setHoveredDiv}
                        hoveredDiv={hoveredDiv}
                      />
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
