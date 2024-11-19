import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActionData, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { BiLoaderCircle } from "react-icons/bi";

const MoviesByCountry = ({ getMovieDetail }) => {
  const { countryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [movieDetail, setMovieDetail] = useState({});
  const [nextPage, setNextPage] = useState(0);
  const next = async () => {
    setIsLoading(true);
    setCurrentPage((prev) => prev + 1);
  };
  const prev = async () => {
    setIsLoading(true);
    setCurrentPage((prev) => prev - 1);
  };
  const fetchThroughCountryName = async () => {
    const { data } = await axios.get(`
      https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/countries/${countryName}/${currentPage}
        `);
    setMovies(data.result.data);
    getMovieDetail(data.result.data);
    setCurrentPage(data.result.page);
    setTotalPages(data.result.pages);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchThroughCountryName();

    return () => {};
  }, [currentPage]);

  return (
    <>
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
          <BiLoaderCircle size={60} />
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
    </>
  );
};

export default MoviesByCountry;
