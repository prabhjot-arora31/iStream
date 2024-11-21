import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { BiLoaderCircle } from "react-icons/bi";
import Circles from "react-loading-icons/dist/esm/components/circles";
import Puff from "react-loading-icons/dist/esm/components/puff";

const MoviesByGenres = ({ getMovieDetail }) => {
  const { genre } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("genre_page") || 0
  );
  const [totalPages, setTotalPages] = useState(0);
  const next = async () => {
    localStorage.setItem("genre_page", currentPage + 1);
    setIsLoading(true);
    setCurrentPage((prev) => prev + 1);
  };
  const prev = async () => {
    localStorage.setItem("genre_page", currentPage - 1);
    setIsLoading(true);
    setCurrentPage((prev) => prev - 1);
  };
  const [movies, setMovies] = useState([]);
  const fetchMoviesByGenre = async () => {
    const { data } = await axios.get(`
        https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/genres/${genre}/${currentPage}`);
    setMovies(data.result.data);
    setCurrentPage(data.result.page);
    setTotalPages(data.result.pages);

    // getMovieDetail(data.result.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMoviesByGenre();

    return () => {};
  }, [currentPage]);

  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Current Page: {currentPage}</h4>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.4rem",
          flexWrap: "wrap",
        }}
      >
        {!isLoading ? (
          movies.map((ele, id) => {
            return <MovieCard data={ele} getMovieDetail={getMovieDetail} />;
          })
        ) : (
          //   <BiLoaderCircle size={60} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Puff stroke="#ff0000" strokeOpacity={20.125} speed={0.75} />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
          marginBottom: "18px",
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
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.setItem("genre_page", 1);
            setIsLoading(true);
            setCurrentPage(1);
          }}
        >
          1
        </span>{" "}
        ..{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.setItem("genre_page", Math.floor(totalPages / 2));
            setIsLoading(true);
            setCurrentPage(Math.floor(totalPages / 2));
          }}
        >
          {Math.floor(totalPages / 2)}
        </span>{" "}
        ..
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.setItem("genre_page", totalPages);
            setIsLoading(true);
            setCurrentPage(totalPages);
          }}
        >
          {totalPages}
        </span>
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
    </div>
  );
};

export default MoviesByGenres;
