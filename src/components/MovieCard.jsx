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
        if (data?.first_air_date) {
          console.log("id and Type is:", data?.id, data?.Type);
          if (data?.imdbID) navigate("/detail/" + data.imdbID + "/tv");
          else navigate("/detail/" + data.id + "/tv");
        } else if (data?.id) navigate("/detail/" + data.id);
        else if (data?.imdbID) {
          if (data?.Type == "movie") navigate("/detail/" + data.imdbID);
          else navigate("/detail/" + data.imdbID + "/tv");
        }

        // getMovieDetail(data);
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        if (movies.find((movie) => movie.id === data.id)) return;
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
            data?.Poster
              ? data?.Poster == "N/A"
                ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                : data?.Poster?.includes("themoviedb")
                ? data.Poster.replace("themoviedb", "tmbd")
                : data?.Poster
              : "https://image.tmdb.org/t/p/w500" + data?.poster_path
            // ? data.Poster
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
          <span style={{ opacity: 1, color: "white" }}>
            {data?.Year || data?.release_date?.substring(0, 4)}
          </span>
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
          <span style={{ opacity: 1, color: "white" }}>
            {data?.Type || data?.first_air_date ? "series" : "movie"}
          </span>
        </h4>
      </div>
      <h3 style={{ marginTop: "5px", textAlign: "center" }}>
        {/* {data.Title.length > 15
          ? data.Title.substring(0, 15) + "..."
          : data.Title} */}
        {data?.Title
          ? data.Title.length > 15
            ? data.Title.substring(0, 15) + "..."
            : data.Title
          : data?.title
          ? data.title.length > 15
            ? data.title.substring(0, 15) + "..."
            : data.title
          : data?.name
          ? data.name.length > 15
            ? data.name.substring(0, 15) + "..."
            : data.name
          : null}
      </h3>
    </div>
  );
};

export default MovieCard;
