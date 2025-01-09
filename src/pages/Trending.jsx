import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  console.log("yo:", JSON.parse(localStorage.getItem("trending-load")));
  const [loading, setLoading] = useState(true);

  const [hover, setHover] = useState();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const [trendingPerson, setTrendingPerson] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [hoveredDiv, setHoveredDiv] = useState();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    div::-webkit-scrollbar {
      width: 10px; /* Adjust scrollbar width */
      border: 2px solid red; /* Add border */
    }
    div::-webkit-scrollbar-thumb {
      background-color: red;
    }
    div::-webkit-scrollbar-track {
      background-color: black;
    }
  `;
    document.head.appendChild(style);
    (async () => {
      const randomM = Math.floor(Math.random() * 500) + 1;
      const randomTV = Math.floor(Math.random() * 500) + 1;
      try {
        const { data } = await axios.get(
          `https://api.tmdb.org/3/trending/movie/week?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&page=${randomM}`
        );
        const data1 = await axios.get(
          `https://api.tmdb.org/3/trending/tv/week?api_key=269890f657dddf4635473cf4cf456576&page=${randomTV}`
        );
        const data2 = await axios.get(
          `https://api.tmdb.org/3/trending/person/week?api_key=8cf43ad9c085135b9479ad5cf6bbcbda&page=${randomTV}`
        );
        setTrendingPerson(data2.data.results);
        setMovies(data.results);
        setTrendingTV(data1.data.results);
        setLoading(false);
        console.log("trending:", data);
      } catch (e) {
        console.log(e.message);
      }
    })();

    return () => {
      //   localStorage.removeItem("trending-set");
      document.head.removeChild(style);
    };
  }, []);
  if (loading) {
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "2.5rem",
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
    <div style={{ color: "white" }}>
      <button
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight, // Scroll to the bottom
            left: document.documentElement.scrollWidth, // Scroll to the right
            behavior: "smooth",
          });
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
      <button
        onClick={() => {
          window.scrollTo({
            top: 0, // Scroll to the bottom
            left: 0, // Scroll to the right
            behavior: "smooth",
          });
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
      {movies.length > 0 && (
        <>
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
              Trending Movies
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
          <div
            style={{
              display: "flex",
              margin: "0 20px",
              alignItems: "center",
              gap: "0.7rem",
              backgroundColor: "black",
              // flexWrap: "wrap",
              overflowX: "auto",
              scrollbarColor: "red white",
              paddingTop: "1.8rem",
            }}
          >
            {movies.map((movie, id) => {
              return (
                <MovieCard
                  data={movie}
                  id={id}
                  key={id}
                  hoveredDiv={hoveredDiv}
                  setHoveredDiv={setHoveredDiv}
                />
              );
            })}
          </div>
        </>
      )}
      {trendingTV.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
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
              Trending Shows
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
          <div
            style={{
              display: "flex",
              scrollbarColor: "red white",
              alignItems: "center",
              gap: "0.7rem",
              backgroundColor: "black",
              // flexWrap: "wrap",
              overflowX: "auto",
              paddingTop: "1.8rem",
              margin: "0 10px",
            }}
          >
            {trendingTV.map((movie, id) => {
              return (
                <MovieCard
                  data={movie}
                  id={id}
                  key={id}
                  hoveredDiv={hoveredDiv}
                  setHoveredDiv={setHoveredDiv}
                />
              );
            })}
          </div>
        </>
      )}
      {trendingPerson.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
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
              Trending Peoples
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              backgroundColor: "black",
              // flexWrap: "wrap",
              overflowX: " auto",
              scrollbarColor: "red white",
              margin: "  0 20px",
              paddingTop: "1.8rem",
              marginBottom: "2rem",
            }}
          >
            {trendingPerson.map((tp, id) => {
              return (
                <div
                  style={{
                    border: "2px solid black",
                    padding: "0.4rem",
                    paddingBottom: "0",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                    gap: "0.3rem",
                    height: "200px",
                    width: "160px",
                    borderRadius: "7px",
                    transition: "0.2s ease-in-out",
                    backgroundColor: hover === tp.id ? "white" : "black",
                  }}
                  onClick={() => {
                    localStorage.setItem("actor-photo", tp.profile_path);
                    navigate("/actor-info/" + tp.id + "/" + tp.name);
                  }}
                  onMouseOver={() => {
                    setHover(tp.id);
                  }}
                  onMouseLeave={() => {
                    setHover("");
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={
                      tp.profile_path
                        ? `https://image.tmdb.org/t/p/w200${tp.profile_path}`
                        : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    }
                    width={"140px"}
                    height={"140px"}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: hover === tp.id ? "black" : "white",
                    }}
                  >
                    {tp?.name?.length > 14
                      ? tp?.name?.substring(0, 14) + "..."
                      : tp?.name}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13.5px",
                      color: tp.character ? "gray" : "black",
                    }}
                  >
                    <span style={{ fontWeight: "bold", margin: 0 }}>
                      {tp?.character}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Trending;
