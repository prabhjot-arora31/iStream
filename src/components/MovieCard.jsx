import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieCard = ({ data, getMovieDetail, id, setHoveredDiv, hoveredDiv }) => {
  const navigate = useNavigate();
  useEffect(() => {
    (() => {
      // console.log("in movie card:", data);
    })();

    return () => {};
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setHoveredDiv(id);
      }}
      onMouseOut={() => {
        setHoveredDiv(-1);
      }}
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto", // For instant scrolling
        });
        getMovieDetail(data);
        navigate("/detail/" + data.imdbID);
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        if (movies.find((movie) => movie.imdbID === data.imdbID)) return;
        movies.push(data);
        localStorage.setItem("movies", JSON.stringify(movies));
      }}
      style={{
        cursor: "pointer",
        maxWidth: "180px",
        display: "flex",
        // transform: `${id == hoveredDiv ? "scale(1.13)" : ""}`,
        // backgroundColor: `${id == hoveredDiv ? "purple" : "white"}`,
        // zIndex: `${id == hoveredDiv ? 10 : 0}`,
        transition: "0.5s ease-in-out",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* <h3
          style={{
            marginTop: 0,
            position: "absolute",
            backgroundColor: "yellow",
            right: 0,
            paddingLeft: "0.2rem",
            paddingRight: "0.2rem",
            paddingTop: "0.1rem",
            paddingBottom: "0.1rem",
            top: 0,
          }}
        >
          HD
        </h3> */}
        <img
          src={
            data.Poster.includes("themoviedb")
              ? data.Poster.replace("themoviedb", "tmbd")
              : data.Poster
            // ? data.Poster
            // : "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }
          style={{
            width: "170px",
            height: "230px",
            maxHeight: "230px",
            borderRadius: "10px",
            objectFit: "cover",
            transform: `${id == hoveredDiv ? "scale(1.07)" : "scale(1)"}`,
            transition: ".13s ease-in-out",
          }}
        />
        <h4
          style={{
            position: "absolute",
            top: "0",
            right: 0,
            opacity: 1,
            textAlign: "center",
            margin: "0 auto",
            padding: "0.12rem",
            borderTopRightRadius: "10px",
            background:
              "linear-gradient(to top , rgba(0,0,0,0.8) , rgba(0,0,0,0.5))",
          }}
        >
          <span style={{ opacity: 1, color: "white" }}>{data?.Year}</span>
        </h4>
        <h4
          style={{
            position: "absolute",
            top: "0",
            left: 0,
            opacity: 1,
            textAlign: "center",
            margin: "0 auto",
            padding: "0.12rem",
            borderTopLeftRadius: "10px",
            background:
              "linear-gradient(to top , rgba(0,0,0,0.8) , rgba(0,0,0,0.5))",
          }}
        >
          <span style={{ opacity: 1, color: "white" }}>{data?.Type}</span>
        </h4>
      </div>
      <h3 style={{ marginTop: "5px", textAlign: "center" }}>
        {/* {data.Title.length > 15
          ? data.Title.substring(0, 15) + "..."
          : data.Title} */}
        {data?.Title?.length > 15
          ? data?.Title.substring(0, 15) + "..."
          : data?.Title}
      </h3>
    </div>
  );
};

export default MovieCard;
