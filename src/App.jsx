import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
// import "./App.css";
import MovieCard from "./components/MovieCard";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import CastAndCrew from "./pages/CastAndCrew";
import ActorInfo from "./pages/ActorInfo";
import Footer from "./components/Footer";
import Trending from "./pages/Trending";
import Gallery from "./pages/Gallery";

function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [suggestedBtnHover, setSuggestedBtnHover] = useState();

  const [continueWatching, setContinueWatching] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [isTopScreen, setIsTopScreen] = useState(true);
  const [isBottomScreen, setIsBottomScreen] = useState(false);
  const [topRatedTvShowsLoading, setTopRatedTvShowsLoading] = useState(true);
  const [watchBtnHover, setWatchBtnHover] = useState(false);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [topRatedMovieLoading, setTopRatedMovieLoading] = useState(true);
  const topRatedTv = async () => {
    try {
      var page = Math.floor(Math.random() * 104);
      if (page == 0) page = 1;
      const { data } = await axios.get(
        `https://api.tmdb.org/3/tv/top_rated?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&page=${page}`
      );
      //console.log("tv shows: ", data);
      setTopRatedTvShowsLoading(false);
      setTopRatedTvShows(data.results);
    } catch (error) {
      setTopRatedTvShowsLoading(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page (tolerance threshold)
      if (documentHeight - (scrollPosition + screenHeight) <= 1) {
        setIsTopScreen(false); // We're at or near the bottom
        setIsBottomScreen(true);
      } else {
        setIsTopScreen(true); // We're not at the bottom
        setIsBottomScreen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const topRated = async () => {
    try {
      var page = Math.floor(Math.random() * 500);
      const { data } =
        await axios.get(`https://api.tmdb.org/3/movie/top_rated?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&language=en-US&page=${page}
`);
      //console.log("top rated:", data);
      setTopRatedMovieLoading(false);
      setTopRatedMovies(data.results);
    } catch (error) {
      //console.log(error.message);
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
    //     //console.log("from fetch:", data); // Log the parsed data
    //   })
    //   .catch((err) => {
    //     //console.error("Error:", err); // Log any errors that occur
    //   });

    try {
      const { data } = await axios.get(
        // `https://istream-proxy-search-suggestions.vercel.app/searching/${searches}`,
        // `http://localhost:9005/searching/${searches}`,
        `https://api.tmdb.org/3/search/multi?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&query=${searches}`
      );
      //console.log("search result:", data);
      setSearchResults(data?.results);
    } catch (e) {
      //console.log("Error:", e.message);
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
  const [hoveredDiv2, setHoveredDiv2] = useState();
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
      //console.log(data.results);
      setMovies(data.results);
      setIsLoading(false);
    } catch (e) {
      //console.log(e);
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
        // //console.log("by name: " + data.data.result.data);
        console.log("all:", data);
        setMovies(data.data.Search);
        setTypeText("All");
        if (data.data.Search.length <= 0) {
          seterror("No results found");
        }
        setIsLoading(false);
        //console.log("movie is:", movies);
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
      ////console.log(randomNumber);
      const data = await axios.get(
        // `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/all/${randomNumber}`
        `
        https://www.omdbapi.com/?t=fast+and+furios&apikey=2d70fb93
        `
      );
      // //console.log(data.data.result.data);
      setMovies(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // document.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    // });
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
    <div
      style={{
        backgroundColor: "black",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ flex: 1 }}>
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
                  marginTop: "2rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  position: "relative",
                  minHeight: "100%",
                }}
              >
                {isTopScreen && (
                  <button
                    onClick={() => {
                      window.scrollTo({
                        top: document.documentElement.scrollHeight, // Scroll to the bottom
                        left: document.documentElement.scrollWidth, // Scroll to the right
                        behavior: "smooth",
                      });
                      setIsTopScreen(false);
                    }}
                    style={{
                      color: "white",
                      position: "fixed",
                      right: "25px",
                      bottom: "25px",
                      zIndex: 20,
                      backgroundColor: "red",
                      border: "none",
                      padding: "0.3rem 0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15L3 7H17L10 15Z" fill="black" />
                    </svg>
                  </button>
                )}
                {isBottomScreen && (
                  <button
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                      setIsTopScreen(true);
                    }}
                    style={{
                      color: "white",
                      position: "fixed",
                      left: "25px",
                      bottom: "25px",
                      zIndex: 20,
                      backgroundColor: "red",
                      border: "none",
                      padding: "0.3rem 0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 5L3 13H17L10 5Z" fill="black" />
                    </svg>
                  </button>
                )}

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
                        border: "none",
                        borderRadius: "15px",
                        fontSize: "15px",
                        outline: "none",
                        width: "230px",
                      }}
                      value={Search}
                      onChange={(e) => {
                        setIsInputClicked(true);
                        setSearch(e.target.value);
                        searching(e.target.value.trim());
                      }}
                      placeholder="Search movies, series or person....."
                    />
                  </div>
                  <button
                    onMouseOver={() => {
                      setSearchBtnHover(true);
                    }}
                    onMouseOut={() => {
                      setSearchBtnHover(false);
                    }}
                    style={{
                      backgroundColor: searchBtnHover ? "white" : "black",
                      // background: searchBtnHover
                      //   ? "linear-gradient(to right , red, orange)"
                      //   : "linear-gradient(to right , orange, red)",
                      color: searchBtnHover ? "black" : "white",
                      alignSelf: "flex-start",
                      borderRadius: "5px",
                      padding: "0.5rem",
                      paddingLeft: "0.8rem",
                      paddingRight: "0.8rem",
                      cursor: "pointer",
                      fontSize: "15px",
                      border: "1px solid white",
                    }}
                    onClick={() => {
                      setTopRatedTvShows([]);
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
                <div style={{ zIndex: 10, position: "relative", top: "40px" }}>
                  {isInputClicked && searchResults?.length > 0 && (
                    <div
                      className="movie-suggestions"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "0.24rem",
                        marginLeft: "0.18rem",
                        boxShadow: "0 0 5px black",
                        padding: "0.432rem",
                        // padding: "0.23rem",
                        maxHeight: "620px",
                        backgroundColor: "white",
                        overflowY: "auto",
                        width: "300px",
                        borderRadius: "10px",
                      }}
                    >
                      {searchResults?.length > 0 ? (
                        searchResults
                          .filter(
                            (value, index, self) =>
                              // Filter by unique 'title' (no duplicates)
                              index ===
                              self.findIndex((t) => t.title === value.title)
                          )
                          .map((ele, id) => {
                            return (
                              <div
                                key={id}
                                onMouseOver={() => {
                                  // if (ele?.title)
                                  // setSuggestedBtnHover(ele?.title);
                                  // else setSuggestedBtnHover(ele?.name);
                                  setSuggestedBtnHover(id);
                                }}
                                onClick={() => {
                                  window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "auto", // Instant scrolling
                                  });

                                  if (ele?.media_type !== "person") {
                                    let movies =
                                      JSON.parse(
                                        localStorage.getItem("movies")
                                      ) || [];
                                    // Check if the movie is already in the list
                                    if (
                                      !movies.find(
                                        (movie) => movie.id === ele?.id
                                      )
                                    ) {
                                      movies.push(ele); // Push the `ele` object
                                      localStorage.setItem(
                                        "movies",
                                        JSON.stringify(movies)
                                      );
                                    }
                                  }

                                  if (ele?.imdbID) {
                                    if (ele.poster_path) {
                                      navigate("/detail/" + ele.imdbID);
                                    } else {
                                      localStorage.setItem(
                                        "actor-photo",
                                        ele?.profile_path
                                      );
                                      navigate(
                                        "/actor-info/" +
                                          ele?.imdbID +
                                          "/" +
                                          ele?.name
                                      );
                                    }
                                  } else if (ele?.id) {
                                    if (!ele.first_air_date) {
                                      if (ele?.poster_path) {
                                        navigate("/detail/" + ele.id);
                                      } else {
                                        localStorage.setItem(
                                          "actor-photo",
                                          ele?.profile_path
                                        );
                                        navigate(
                                          "/actor-info/" +
                                            ele?.id +
                                            "/" +
                                            ele?.name
                                        );
                                      }
                                    } else {
                                      if (ele?.poster_path) {
                                        navigate("/detail/" + ele.id + "/tv");
                                      } else {
                                        localStorage.setItem(
                                          "actor-photo",
                                          ele?.profile_path
                                        );
                                        navigate(
                                          "/actor-info/" +
                                            ele?.id +
                                            "/" +
                                            ele?.name
                                        );
                                      }
                                    }
                                  }
                                }}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  gap: "7px",
                                  padding: "0.23rem",
                                  justifyContent: "start",
                                  border: "1px solid white",
                                  marginTop: "10px",
                                  alignItems: "center",
                                  backgroundColor:
                                    suggestedBtnHover == id ? "black" : "white",
                                }}
                              >
                                <div>
                                  <img
                                    src={
                                      ele?.poster_path
                                        ? "https://image.tmdb.org/t/p/w500" +
                                          ele?.poster_path
                                        : "https://image.tmdb.org/t/p/w500" +
                                          ele?.profile_path
                                    }
                                    width={"100%"}
                                    style={{
                                      width: "60px",
                                      height: ele?.poster_path
                                        ? "90px"
                                        : "60px",
                                      border:
                                        suggestedBtnHover == id
                                          ? "1px solid white"
                                          : "1px solid black",
                                      maxHeight: "230px",
                                      borderRadius: ele?.poster_path
                                        ? "10px"
                                        : "65px",
                                      objectFit: "cover",
                                      transition: ".13s ease-in-out",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                  }}
                                >
                                  <h5
                                    style={{
                                      color:
                                        suggestedBtnHover == id
                                          ? "salmon"
                                          : "black",
                                      margin: 0,
                                      marginBottom: "6px",
                                      cursor: "pointer",
                                      fontSize: "15.8px",
                                      fontWeight: "bold",
                                      border: "none",
                                      // backgroundColor:
                                      //   suggestedBtnHover == ele?.title
                                      //     ? "lightsalmon"
                                      //     : "",
                                    }}
                                  >
                                    {ele?.title
                                      ? ele?.title?.length > 70
                                        ? ele?.title?.substring(0, 70) + "..."
                                        : ele?.title
                                      : ele?.name?.length > 70
                                      ? ele?.name?.substring(0, 70) + "..."
                                      : ele?.name}
                                  </h5>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "start",
                                      gap: "0.5rem",
                                      margin: 0,
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "13.5px",
                                        color:
                                          suggestedBtnHover == id
                                            ? "white"
                                            : "black",
                                      }}
                                    >
                                      {ele?.release_date
                                        ? ele?.release_date?.substring(0, 4)
                                        : ele?.first_air_date?.substring(0, 4)}
                                      {ele?.poster_path && (
                                        <span
                                          style={{
                                            marginLeft: "1.2rem",
                                            fontWeight: "bold",
                                            marginRight: "0.4rem",
                                          }}
                                        >
                                          |{" "}
                                        </span>
                                      )}
                                    </p>{" "}
                                    {ele?.poster_path && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        style={{ margin: 0 }}
                                        class="ipc-icon ipc-icon--star sc-d541859f-4 LNYqq"
                                        viewBox="0 0 24 24"
                                        fill="orange"
                                        role="presentation"
                                      >
                                        <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                                      </svg>
                                    )}
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "13.5px",
                                        color:
                                          suggestedBtnHover == id
                                            ? "white"
                                            : "black",
                                      }}
                                    >
                                      {ele?.vote_average
                                        ?.toString()
                                        .substring(0, 3)}
                                    </p>
                                    {ele?.media_type != "person" && (
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: "13.5px",
                                          color:
                                            suggestedBtnHover == id
                                              ? "white"
                                              : "black",
                                          padding: "0.3rem",
                                          border: ele?.title
                                            ? suggestedBtnHover == ele?.title
                                              ? "white"
                                              : "black"
                                            : suggestedBtnHover == ele?.name
                                            ? "white"
                                            : "black",
                                          borderRadius: "0.2371rem",
                                        }}
                                      >
                                        {" "}
                                        {ele?.media_type}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      ) : (
                        <div
                          style={{
                            margin: "0 auto",

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
                    </div>
                  )}
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
                      <>
                        {/* Banner */}
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
                                      typeText == "All" ? "red" : "white",
                                    color:
                                      typeText != "All" ? "black" : "white",
                                    border:
                                      typeText != "All"
                                        ? "1px solid red"
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
                                      typeText == "Movie" ? "red" : "white",
                                    color:
                                      typeText != "Movie" ? "black" : "white",
                                    border:
                                      typeText != "Movie"
                                        ? "1px solid red"
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
                                      typeText == "Series" ? "red" : "white",
                                    color:
                                      typeText != "Series" ? "black" : "white",
                                    border:
                                      typeText != "Series"
                                        ? "1px solid red"
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
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    backgroundColor: "black",

                                    top: "30px",
                                  }}
                                >
                                  <div
                                    style={{
                                      margin: "0 auto",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "0.6rem",
                                      backgroundColor: "black",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    <div
                                      style={{
                                        maxWidth: "1200px",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        backgroundColor: "black",
                                      }}
                                    >
                                      <img
                                        src={`https://image.tmdb.org/t/p/w1280${movies[0]?.backdrop_path}`}
                                        style={{
                                          objectFit: "cover",
                                          width: "100%",
                                          maxWidth: "960px",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        color: "white",
                                        backgroundColor: "black",
                                        padding: "0.6rem",
                                      }}
                                    >
                                      <h1 style={{ margin: 0 }}>
                                        {movies[0]?.title}
                                      </h1>
                                      {/* <p style={{ margin: 0, maxWidth: "450px" }}>
                                      Investigative journalist Eddie Brock
                                      attempts a comeback following a scandal,
                                      but accidentally becomes the host of
                                      Venom, a violent, super powerful alien
                                      symbiote. Soon, he must rely on his
                                      newfound powers to protect the world from
                                      a shadowy organization looking for a
                                      symbiote of their own.
                                    </p> */}
                                      {movies[0]?.vote_average > 0 && (
                                        <p
                                          style={{
                                            margin: 0,
                                            display: "flex",
                                            marginTop: "0.6rem",
                                            justifyContent: "left",
                                            alignItems: "center",
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="23"
                                            height="23"
                                            style={{ margin: 0 }}
                                            class="ipc-icon ipc-icon--star sc-d541859f-4 LNYqq"
                                            viewBox="0 0 24 24"
                                            fill="orange"
                                            role="presentation"
                                          >
                                            <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                                          </svg>
                                          {movies[0]?.vote_average
                                            .toString()
                                            .substring(0, 3)}
                                        </p>
                                      )}
                                      {/* <p>
                                      <button
                                        style={{
                                          color: "white",
                                          backgroundColor: "red",
                                          padding: "0.32rem 0.54rem",
                                          border: "none",
                                        }}
                                      >
                                        Science Fiction
                                      </button>
                                      <button
                                        style={{
                                          color: "white",
                                          backgroundColor: "red",
                                          padding: "0.32rem 0.54rem",
                                          border: "none",
                                          marginLeft: "0.4rem",
                                        }}
                                      >
                                        Action
                                      </button>
                                    </p> */}
                                      <p>
                                        <button
                                          onMouseOver={() => {
                                            setWatchBtnHover(true);
                                          }}
                                          onMouseLeave={() => {
                                            setWatchBtnHover(false);
                                          }}
                                          onClick={() => {
                                            navigate(
                                              `/detail/${movies[0]?.id}`
                                            );
                                          }}
                                          style={{
                                            borderRadius: "10px",
                                            padding: "0.5rem 0.9rem",
                                            backgroundColor: watchBtnHover
                                              ? "red"
                                              : "black",
                                            color: !watchBtnHover
                                              ? "red"
                                              : "white",
                                            border: "none",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            border: "1px solid red",
                                          }}
                                        >
                                          WATCH
                                        </button>
                                      </p>
                                    </div>
                                  </div>
                                </div>{" "}
                                {continueWatching.length > 0 && (
                                  <div
                                    style={{
                                      backgroundColor: "black",
                                      paddingTop: "6rem",
                                    }}
                                  >
                                    <h2
                                      style={{
                                        color: "white",
                                        textAlign: "center",
                                        marginBottom: "2.3rem",
                                      }}
                                    >
                                      Continue Watching
                                    </h2>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "0.7rem",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {[...continueWatching]
                                        .reverse()
                                        .slice(0, 6)
                                        .map((movie, id) => {
                                          return (
                                            <MovieCard
                                              data={movie}
                                              id={id}
                                              key={id}
                                              hoveredDiv={hoveredDiv2}
                                              setHoveredDiv={setHoveredDiv2}
                                            />
                                          );
                                        })}
                                    </div>
                                  </div>
                                )}
                                <div
                                  style={{
                                    margin: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0.54rem",
                                    paddingTop: "7rem",
                                    backgroundColor: "black",
                                  }}
                                >
                                  <h2
                                    style={{
                                      margin: 0,
                                      textAlign: "left",

                                      fontSize: "27px",
                                      color: "white",
                                    }}
                                  >
                                    Popular Movies
                                  </h2>
                                  <div
                                    style={{
                                      height: "35px",

                                      margin: 0,
                                      width: "4.5px",
                                      backgroundColor: "red",
                                    }}
                                  ></div>
                                </div>
                              </>
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "1.8rem",
                                backgroundColor: "black",
                                gap: "0.7rem",
                                opacity:
                                  isInputClicked && searchResults?.length > 0
                                    ? "0.4"
                                    : 1,
                                flexWrap: "wrap",
                              }}
                            >
                              {movies?.length > 0 &&
                                movies.map((ele, id) => {
                                  if (id != 0)
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
                              <div
                                style={{
                                  margin: 0,
                                  display: "flex",
                                  backgroundColor: "black",
                                  justifyContent: "center",
                                  // marginBottom: "20px",
                                  alignItems: "center",
                                  gap: "0.54rem",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "2px",
                                      backgroundColor: "lightgray",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "1.5rem",
                                      gap: "0.56rem",
                                    }}
                                  >
                                    <h2
                                      style={{
                                        margin: 0,
                                        textAlign: "left",

                                        fontSize: "27px",
                                        color: "white",
                                      }}
                                    >
                                      Top Rated Movies
                                    </h2>
                                    <div
                                      style={{
                                        height: "35px",
                                        margin: 0,
                                        width: "4.5px",
                                        backgroundColor: "red",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {movies[0].poster_path && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "0.7rem",
                                  backgroundColor: "black",
                                  flexWrap: "wrap",
                                  paddingTop: "1.8rem",
                                }}
                              >
                                {topRatedMovieLoading &&
                                movies[0].poster_path ? (
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
                            {movies[0].poster_path &&
                              topRatedTvShows?.length > 0 && (
                                <div
                                  style={{
                                    margin: 0,
                                    display: "flex",
                                    backgroundColor: "black",
                                    justifyContent: "center",
                                    // marginBottom: "20px",
                                    alignItems: "center",
                                    gap: "0.54rem",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "2px",
                                        backgroundColor: "lightgray",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1.5rem",
                                        gap: "0.56rem",
                                      }}
                                    >
                                      <h2
                                        style={{
                                          margin: 0,
                                          textAlign: "left",

                                          fontSize: "27px",
                                          color: "white",
                                        }}
                                      >
                                        Top Rated TV Shows
                                      </h2>
                                      <div
                                        style={{
                                          height: "35px",
                                          margin: 0,
                                          width: "4.5px",
                                          backgroundColor: "red",
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
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
                                    paddingTop: "1.8rem",
                                    backgroundColor: "black",
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
                      </>
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
                                typeText === "All" ? "red" : "white"
                              }`,
                              border: `${
                                typeText !== "All" ? "2px solid red" : ""
                              }`,
                              color: `${typeText !== "All" ? "red" : "white"}`,
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
                                typeText === "Movie" ? "red" : "white"
                              }`,
                              border: `${
                                typeText !== "Movie" ? "2px solid red" : ""
                              }`,
                              color: `${
                                typeText !== "Movie" ? "red" : "white"
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
                                typeText === "Series" ? "red" : "white"
                              }`,
                              border: `${
                                typeText !== "Series" ? "2px solid red" : ""
                              }`,
                              color: `${
                                typeText !== "Series" ? "red" : "white"
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
          <Route path="/cast-and-crew/:id/:tv?" element={<CastAndCrew />} />
          <Route path="/actor-info/:id/:name" element={<ActorInfo />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/gallery/:id/:tv?" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
