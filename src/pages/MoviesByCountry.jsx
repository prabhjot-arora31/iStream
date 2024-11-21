import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActionData, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { BiLoaderCircle } from "react-icons/bi";
import Puff from "react-loading-icons/dist/esm/components/puff";

const MoviesByCountry = ({ getMovieDetail }) => {
  const { countryName } = useParams();
  const [hoveredDiv, setHoveredDiv] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("country_page") || 0
  );
  const [movieDetail, setMovieDetail] = useState({});
  const [nextPage, setNextPage] = useState(0);
  const next = async () => {
    localStorage.setItem("country_page", currentPage + 1);
    setIsLoading(true);
    setCurrentPage((prev) => prev + 1);
  };
  const prev = async () => {
    localStorage.setItem("country_page", currentPage - 1);
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
          gap: "0.7rem",
          flexWrap: "wrap",
        }}
      >
        {!isLoading ? (
          movies.map((ele, id) => {
            return (
              <MovieCard
                id={id}
                setHoveredDiv={setHoveredDiv}
                hoveredDiv={hoveredDiv}
                data={ele}
                getMovieDetail={getMovieDetail}
              />
            );
          })
        ) : (
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
            setIsLoading(true);
            setCurrentPage(totalPages / 2);
          }}
        >
          {Math.floor(totalPages / 2)}
        </span>{" "}
        ..{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
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
    </>
  );
};

export default MoviesByCountry;
