import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [movies, setMovies] = useState([]);
  const [Search, setSearch] = useState("");
  const [MovieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getMovieDetail = (detail) => {
    setMovieDetail(detail);
  };
  const fetchByName = async (index) => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `
        https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/search?query=${Search}&page=${index} 
        `
      );
      console.log("by name: " + data.data.result.data);
      console.log("all:", data.data);
      setCurrentPage(data.data.result.page);
      setMovies(data.data.result.data);
      setTotalPages(data.data.result.pages);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
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
        `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/all/${randomNumber}`
      );
      console.log(data.data.result.data);
      setMovies(data.data.result.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (currentPage == 0) fetchIt();
    else fetchByName(currentPage);
    return () => {
      setMovies([]);
    };
  }, [currentPage]);
  // useEffect(() => {
  //   fetchByName();
  //   return () => {
  //     setMovies([]);
  //   };
  // }, [currentPage]);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <div
                style={{
                  display: "flex",
                  gap: "0.7rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    margin: "10px auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: 7,
                    marginBottom: "20px",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid black",
                    }}
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter any movie/series name.."
                  />
                  <button
                    style={{
                      backgroundColor: "yellow",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const searches =
                        JSON.parse(localStorage.getItem("searches")) || [];
                      searches.push(Search);
                      localStorage.setItem(
                        "searches",
                        JSON.stringify(searches)
                      );
                      fetchByName(1);
                    }}
                  >
                    Search
                  </button>
                </div>
                {!isLoading ? (
                  <div>
                    {currentPage != 0 && (
                      <p style={{ textAlign: "center" }}>
                        Current Page: {currentPage}
                      </p>
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
                      {movies.length > 0 ? (
                        movies.map((ele, id) => {
                          return (
                            <MovieCard
                              data={ele}
                              getMovieDetail={getMovieDetail}
                            />
                          );
                        })
                      ) : (
                        <p>No results found!</p>
                      )}
                    </div>
                    {currentPage != 0 && movies.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "0.8rem",
                        }}
                      >
                        {currentPage != 1 && (
                          <button
                            onClick={() => prev()}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "0.8rem",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: "0.3rem",
                            }}
                          >
                            Prev
                          </button>
                        )}
                        1 .. {totalPages}
                        <button
                          onClick={() => next()}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "0.8rem",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "0.3rem",
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Puff stroke="#ff0000" strokeOpacity={20.125} speed={0.75} />
                )}
              </div>
            }
          />
          <Route
            path="/detail/:id"
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
