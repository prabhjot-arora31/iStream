import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { FaSpinner } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { TbLoaderQuarter } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import Country from "./pages/Country";
import MoviesByCountry from "./pages/MoviesByCountry";

import History from "./pages/History";
import Genres from "./pages/Genres";
import MoviesByGenres from "./pages/MoviesByGenres";
import Puff from "react-loading-icons/dist/esm/components/puff";
import RecommendedMovies from "./pages/RecommendedMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [suggestedBtnHover, setSuggestedBtnHover] = useState("");
  const [topRatedTvShowsLoading, setTopRatedTvShowsLoading] = useState(true);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [topRatedMovieLoading, setTopRatedMovieLoading] = useState(true);
  const topRatedTv = async () => {
    try {
      var page = Math.floor(Math.random() * 500);
      const { data } = await axios.get(
        `https://api.tmdb.org/3/tv/top_rated?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&page=${page}`
      );
      console.log(data);
      setTopRatedTvShowsLoading(false);
      setTopRatedTvShows(data.results);
    } catch (error) {
      setTopRatedTvShowsLoading(false);
    }
  };
  const topRated = async () => {
    try {
      var page = Math.floor(Math.random() * 500);
      const { data } =
        await axios.get(`https://api.tmdb.org/3/movie/top_rated?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&page=${page}
`);
      console.log("top rated:", data);
      setTopRatedMovieLoading(false);
      setTopRatedMovies(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };
  const searching = async (searches) => {
    // fetch(
    //   `https://cors-anywhere.herokuapp.com/https://iosmirror.cc/search.php?s=end`
    // )
    //   .then((response) => {
    //     // Check if the response is successful
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json(); // Parse the response as JSON
    //   })
    //   .then((data) => {
    //     console.log("from fetch:", data); // Log the parsed data
    //   })
    //   .catch((err) => {
    //     console.error("Error:", err); // Log any errors that occur
    //   });

    try {
      const { data } = await axios.get(
        // `https://istream-proxy-search-suggestions.vercel.app/searching/${searches}`,
        // `http://localhost:9005/searching/${searches}`,
        `https://api.tmdb.org/3/search/movie?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&query=${searches}`
      );
      console.log("search result:", data);
      setSearchResults(data.results);
    } catch (e) {
      console.log("Error:", e.message);
      setSearchResults([]);
    }
  };
  const [Search, setSearch] = useState("");
  const [MovieDetail, setMovieDetail] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [error, seterror] = useState("");
  // const location = useLocation();
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [typeText, setTypeText] = useState("Movie");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hoveredDiv, setHoveredDiv] = useState();
  const [searchBtnHover, setSearchBtnHover] = useState(false);
  const getMovieDetail = (detail) => {
    setMovieDetail(detail);
  };
  const fetchByDifAPI = async () => {
    try {
      var page = Math.floor(Math.random() * 500);
      const { data } = await axios.get(
        `https://api.tmdb.org/3/movie/popular?api_key=fafef439971c0bedf1c12e7a5be971c2&language=en-US&page=${page}`
      );
      console.log(data.results);
      setMovies(data.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const fetchByName = async () => {
    setType("movie");
    if (type) {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `
          https://www.omdbapi.com/?apikey=2d70fb93&s=${Search.trim()}&page=1
  
  `
        );
        // console.log("by name: " + data.data.result.data);
        console.log("all:", data);
        setMovies(data.data.Search);
        setTypeText("All");
        if (data.data.Search.length <= 0) {
          seterror("No results found");
        }
        setIsLoading(false);
        console.log("movie is:", movies);
        // if (data.data.result.data.length > 0) {
        //   setCurrentPage(data.data.result.page);
        //   setTotalPages(data.data.result.pages);
        // } else setCurrentPage(0);
        // setMovies(data.data.result.data);
        // setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    // https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/search?query=${Search}&page=${index}
    // https://www.omdbapi.com/?t=${Search}&apikey=2d70fb93
  };
  const next = async () => {
    localStorage.setItem("common_page", currentPage + 1);
    setIsLoading(true);
    setCurrentPage((prev) => prev + 1);
  };
  const prev = async () => {
    localStorage.setItem("common_page", currentPage - 1);
    setIsLoading(true);
    setCurrentPage((prev) => prev - 1);
  };
  const fetchIt = async () => {
    setIsLoading(true);
    try {
      const randomNumber = Math.floor(Math.random() * 1100) + 1;
      //console.log(randomNumber);
      const data = await axios.get(
        // `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/all/${randomNumber}`
        `
        https://www.omdbapi.com/?t=fast+and+furios&apikey=2d70fb93
        `
      );
      // console.log(data.data.result.data);
      setMovies(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchByDifAPI();
    topRated();
    topRatedTv();

    return () => {};
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("input") === null) {
        setIsInputClicked(false); // Hide suggestions
      }
    };

    // Adding event listener when input is clicked
    if (isInputClicked) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup event listener when component unmounts or input is not clicked
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isInputClicked]);
  // useEffect(() => {
  //   fetchByName();
  //   return () => {
  //     setMovies([]);
  //   };
  // }, [currentPage]);
  const movieList = [
    "The Dark Knight",
    "Inception",
    "Avengers: Endgame",
    "Parasite",
    "The Godfather",
    "My Demon",
    "Dilwale Dulhania Le Jayenge",
    "3 Idiots",
    "Thor",
    "My Girlfriend Is An Alien",
    "Kabhi Khushi Kabhie Gham",
    "The Matrix",
    "Joker",
    "Pulp Fiction",
    "The Lion King",
    "Interstellar",
    "Lagaan",
    "12 Angry Men",
    "Fight Club",
    "The Pursuit of Happyness",
    "Coco",
    "Star Wars: A New Hope",
    "Black Panther",
    "Your Name",
    "The Notebook",
    "The Shawshank Redemption",
    "Squid Game",
    "The Avengers",
    "The Walking Dead",
    "The Grand Budapest Hotel",
    "The Raid",
    "A Quiet Place",
    "The Witch",
    "The Silence of the Lambs",
    "La La Land",
    "The Conjuring",
    "The Exorcist",
    "7 Khoon Maaf",
    "Andhadhun",
    "Taare Zameen Par",
    "Sita Ramam",
    "Koi Mil Gaya",
    "The Family Man",
    "Money Heist",
    "Stranger Things",
    "Game of Thrones",
    "Goblin",
    "Crash Landing on You",
    "My Name",
    "The King's Affection",
    "The Notebook",
    "Wonder Woman",
  ];

  const getRandomMovies = () => {
    // Shuffle the movie list and get the first 5 items
    const shuffledMovies = movieList.sort(() => 0.5 - Math.random());
    return shuffledMovies.slice(0, 5);
  };
  const [selectedMovies, setSelectedMovies] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/recommended/:movie" element={<RecommendedMovies />} />
          <Route
            path="/"
            exact
            element={
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsInputClicked(false);
                }}
                style={{
                  display: "flex",
                  gap: "0.7rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    // margin: "10px auto",
                    // width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: 7,
                    marginBottom: "20px",
                    position: "absolute",
                    zIndex: "10",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <input
                      onClick={(e) => {
                        setIsInputClicked(true);
                        setSelectedMovies(getRandomMovies());
                        e.stopPropagation();
                      }}
                      type="text"
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        fontSize: "15px",
                        border: "1px solid black",
                      }}
                      value={Search}
                      onChange={(e) => {
                        setIsInputClicked(true);
                        setSearch(e.target.value);
                        searching(Search);
                      }}
                      placeholder="Enter any movie/series name.."
                    />
                    {isInputClicked && searchResults?.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "0.24rem",
                          marginLeft: "0.18rem",
                          boxShadow: "0 0 5px black",
                          // padding: "0.23rem",
                          maxHeight: "220px",
                          overflowY: "auto",
                          maxWidth: "225px",
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        }}
                      >
                        {searchResults?.length > 0 &&
                          searchResults
                            .filter(
                              (value, index, self) =>
                                // Filter by unique 'title' (no duplicates)
                                index ===
                                self.findIndex((t) => t.title === value.title)
                            )
                            .map((ele, id) => {
                              return (
                                <button
                                  key={id}
                                  onMouseOver={() => {
                                    setSuggestedBtnHover(ele?.title);
                                  }}
                                  onClick={() => {
                                    setSearch(ele?.title);
                                  }}
                                  style={{
                                    fontSize: "13px",
                                    color:
                                      suggestedBtnHover == ele?.title
                                        ? "black"
                                        : "gray",
                                    marginBottom: "6px",
                                    cursor: "pointer",
                                    border: "none",
                                    padding: "0.3rem",
                                    textAlign: "left",
                                    backgroundColor:
                                      suggestedBtnHover == ele?.title
                                        ? "lightsalmon"
                                        : "",
                                  }}
                                >
                                  {ele?.title.length > 35
                                    ? ele?.title.substring(0, 35) + "..."
                                    : ele?.title}
                                </button>
                              );
                            })}
                      </div>
                    )}
                  </div>
                  <button
                    onMouseOver={() => {
                      setSearchBtnHover(true);
                    }}
                    onMouseOut={() => {
                      setSearchBtnHover(false);
                    }}
                    style={{
                      backgroundColor: searchBtnHover ? "white" : "lightsalmon",
                      // background: searchBtnHover
                      //   ? "linear-gradient(to right , red, orange)"
                      //   : "linear-gradient(to right , orange, red)",
                      color: "black",
                      alignSelf: "flex-start",
                      borderRadius: "5px",
                      padding: "0.5rem",
                      paddingLeft: "0.8rem",
                      paddingRight: "0.8rem",
                      cursor: "pointer",
                      fontSize: "15px",
                      border: searchBtnHover ? "1px solid black" : "none",
                    }}
                    onClick={() => {
                      const searches =
                        JSON.parse(localStorage.getItem("searches")) || [];
                      if (!searches.find((ele, id) => ele === Search)) {
                        searches.push(Search);
                        localStorage.setItem(
                          "searches",
                          JSON.stringify(searches)
                        );
                      }
                      setTypeText("All");
                      fetchByName();
                    }}
                  >
                    Search
                  </button>
                </div>
                {isLoading === "" ? (
                  <div></div>
                ) : isLoading === true ? (
                  <div
                    style={{
                      margin: "0 auto",
                      marginTop: "30px",
                      width: "80px",
                      height: "80px",
                      position: "absolute",
                      top: "5rem",
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
                ) : (
                  <>
                    {" "}
                    {movies?.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          position: "absolute",
                          top: "5rem",
                          gap: "0.7rem",
                        }}
                      >
                        <div>
                          {currentPage !== 0 && (
                            <p style={{ textAlign: "center" }}>
                              Current Page: {currentPage}
                            </p>
                          )}
                          {movies?.length > 0 && !movies[0].poster_path && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.5rem",
                                marginBottom: "1.6rem",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setIsLoading(true);
                                  setTypeText("All");
                                  (async () => {
                                    const { data } = await axios.get(
                                      `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93`
                                    );
                                    setMovies(data.Search);
                                    setIsLoading(false);
                                  })();
                                }}
                                style={{
                                  padding: "0.38rem",
                                  borderRadius: "0.3rem",
                                  fontSize: "15px",

                                  backgroundColor:
                                    typeText == "All" ? "purple" : "white",
                                  color: typeText != "All" ? "purple" : "white",
                                  border:
                                    typeText != "All"
                                      ? "1px solid purple"
                                      : "none",
                                  cursor: "pointer",
                                }}
                              >
                                All
                              </button>
                              <button
                                onClick={() => {
                                  setIsLoading(true);
                                  setTypeText("Movie");
                                  (async () => {
                                    const { data } = await axios.get(
                                      `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93&type=movie`
                                    );
                                    setMovies(data.Search);
                                    setIsLoading(false);
                                  })();
                                }}
                                style={{
                                  padding: "0.38rem",
                                  borderRadius: "0.3rem",
                                  fontSize: "15px",

                                  backgroundColor:
                                    typeText == "Movie" ? "purple" : "white",
                                  color:
                                    typeText != "Movie" ? "purple" : "white",
                                  border:
                                    typeText != "Movie"
                                      ? "1px solid purple"
                                      : "none",
                                  cursor: "pointer",
                                }}
                              >
                                Movie
                              </button>
                              <button
                                onClick={() => {
                                  setTypeText("Series");
                                  setIsLoading(true);
                                  (async () => {
                                    const { data } = await axios.get(
                                      `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93&type=series`
                                    );
                                    setMovies(data.Search);
                                    setIsLoading(false);
                                  })();
                                }}
                                style={{
                                  padding: "0.38rem",
                                  cursor: "pointer",
                                  fontSize: "15px",
                                  borderRadius: "0.3rem",
                                  backgroundColor:
                                    typeText == "Series" ? "purple" : "white",
                                  color:
                                    typeText != "Series" ? "purple" : "white",
                                  border:
                                    typeText != "Series"
                                      ? "1px solid purple"
                                      : "none",
                                }}
                              >
                                Web Series
                              </button>
                            </div>
                          )}
                          {movies?.length > 0 &&
                            !movies[0].poster_path &&
                            typeText && (
                              <h3 style={{ textAlign: "center" }}>
                                {typeText}
                              </h3>
                            )}
                          {movies[0].poster_path && (
                            <h2 style={{ textAlign: "center" }}>
                              Popular Movies
                            </h2>
                          )}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "0.7rem",
                              flexWrap: "wrap",
                            }}
                          >
                            {movies?.length > 0 &&
                              movies.map((ele, id) => {
                                return (
                                  <MovieCard
                                    id={id}
                                    key={id}
                                    data={ele}
                                    setHoveredDiv={setHoveredDiv}
                                    hoveredDiv={hoveredDiv}
                                    getMovieDetail={getMovieDetail}
                                  />
                                );
                              })}
                          </div>
                          {movies[0].poster_path && (
                            <h2 style={{ textAlign: "center" }}>
                              Top Rated Movies
                            </h2>
                          )}
                          {movies[0].poster_path && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.7rem",
                                flexWrap: "wrap",
                              }}
                            >
                              {topRatedMovieLoading && movies[0].poster_path ? (
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
                              ) : (
                                topRatedMovies?.length > 0 &&
                                topRatedMovies.map((ele, id) => {
                                  return (
                                    <MovieCard
                                      id={id}
                                      key={id}
                                      data={ele}
                                      setHoveredDiv={setHoveredDiv}
                                      hoveredDiv={hoveredDiv}
                                      getMovieDetail={getMovieDetail}
                                    />
                                  );
                                })
                              )}
                            </div>
                          )}
                          {movies[0].poster_path && (
                            <h2 style={{ textAlign: "center" }}>
                              Top Rated TV Shows
                            </h2>
                          )}
                          {topRatedTvShowsLoading ? (
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
                          ) : (
                            topRatedTvShows?.length > 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "0.7rem",
                                  flexWrap: "wrap",
                                }}
                              >
                                {topRatedTvShows.map((ele, id) => {
                                  return (
                                    <MovieCard
                                      id={id}
                                      key={id}
                                      data={ele}
                                      setHoveredDiv={setHoveredDiv}
                                      hoveredDiv={hoveredDiv}
                                      getMovieDetail={getMovieDetail}
                                    />
                                  );
                                })}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "0.5rem",
                            marginBottom: "1.6rem",
                            position: "relative",
                            top: "5rem",
                            // position: "absolute",
                            // left: "45%",
                            // top: "5rem",
                          }}
                        >
                          <button
                            onClick={() => {
                              setIsLoading(true);
                              setTypeText("All");
                              (async () => {
                                const { data } = await axios.get(
                                  `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93`
                                );
                                setMovies(data.Search);
                                setIsLoading(false);
                              })();
                            }}
                            style={{
                              padding: "0.38rem",
                              borderRadius: "0.3rem",
                              backgroundColor: `${
                                typeText === "All" ? "purple" : "white"
                              }`,
                              border: `${
                                typeText !== "All" ? "2px solid purple" : ""
                              }`,
                              color: `${
                                typeText !== "All" ? "purple" : "white"
                              }`,
                              cursor: "pointer",
                            }}
                          >
                            All
                          </button>
                          <button
                            onClick={() => {
                              setIsLoading(true);
                              setTypeText("Movie");
                              (async () => {
                                const { data } = await axios.get(
                                  `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93&type=movie`
                                );
                                setMovies(data.Search);
                                setIsLoading(false);
                              })();
                            }}
                            style={{
                              padding: "0.38rem",
                              borderRadius: "0.3rem",
                              backgroundColor: `${
                                typeText === "Movie" ? "purple" : "white"
                              }`,
                              border: `${
                                typeText !== "Movie" ? "2px solid purple" : ""
                              }`,
                              color: `${
                                typeText !== "Movie" ? "purple" : "white"
                              }`,

                              cursor: "pointer",
                            }}
                          >
                            Movie
                          </button>
                          <button
                            onClick={() => {
                              setTypeText("Series");
                              setIsLoading(true);
                              (async () => {
                                const { data } = await axios.get(
                                  `https://www.omdbapi.com/?s=${Search}&apikey=2d70fb93&type=series`
                                );
                                setMovies(data.Search);
                                setIsLoading(false);
                              })();
                            }}
                            style={{
                              padding: "0.38rem",
                              cursor: "pointer",

                              borderRadius: "0.3rem",
                              backgroundColor: `${
                                typeText === "Series" ? "purple" : "white"
                              }`,
                              border: `${
                                typeText !== "Series" ? "2px solid purple" : ""
                              }`,
                              color: `${
                                typeText !== "Series" ? "purple" : "white"
                              }`,
                            }}
                          >
                            Web Series
                          </button>
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            position: "relative",
                            top: "6.4rem",
                          }}
                        >
                          No results found!!!
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            }
          />
          <Route
            path="/detail/:id/:tv?"
            element={
              <MovieDetails
                MovieDetail={MovieDetail}
                getMovieDetail={getMovieDetail}
              />
            }
          />
          <Route path="/country" element={<Country />} />
          <Route
            path="/country/:countryName"
            element={<MoviesByCountry getMovieDetail={getMovieDetail} />}
          />
          <Route
            path="/history"
            element={<History getMovieDetail={getMovieDetail} />}
          />
          <Route path="/genre" element={<Genres />} />
          <Route
            path="/genres/:genre"
            element={<MoviesByGenres getMovieDetail={getMovieDetail} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
