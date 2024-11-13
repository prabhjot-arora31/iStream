import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [Search, setSearch] = useState("");
  const [MovieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getMovieDetail = (detail) => {
    setMovieDetail(detail);
  };
  const fetchByName = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/search?query=${Search}&page=1 `
      );
      console.log("by name: " + data.data.result.data);
      setMovies(data.data.result.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const fetchIt = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        "https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/all/1"
      );
      console.log(data.data.result.data);
      setMovies(data.data.result.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchIt();
    return () => {};
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
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
              fetchByName();
            }}
          >
            Search
          </button>
        </div>
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
                {!isLoading
                  ? movies.map((ele, id) => {
                      return (
                        <MovieCard data={ele} getMovieDetail={getMovieDetail} />
                      );
                    })
                  : "Loading"}
              </div>
            }
          />
          <Route
            path="/detail/:id"
            element={<MovieDetails MovieDetail={MovieDetail} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
