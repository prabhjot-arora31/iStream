import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const History = ({ getMovieDetail }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(
    (localStorage.getItem("movies") &&
      JSON.parse(localStorage?.getItem("movies"))) ||
      []
  );
  const [history1, setHistory1] = useState(
    (localStorage.getItem("movies") &&
      JSON.parse(localStorage?.getItem("movies"))) ||
      []
  );
  const [searches, setSearches] = useState(
    (localStorage.getItem("searches") &&
      JSON.parse(localStorage?.getItem("searches"))) ||
      []
  );
  const [searchTerm, setsearchTerm] = useState("");
  const [tab, setTab] = useState(1);
  const [hoveredDiv, setHoveredDiv] = useState();

  const deleteInidividualMovie = (id) => {
    // history.find((ele) => ele.Id === id)
    const filteredItems = history.filter((item) => item.imdbID !== id);
    localStorage.setItem("movies", JSON.stringify(filteredItems));
    setHistory(filteredItems);
  };

  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h3
          onClick={() => {
            setTab(1);
          }}
          style={{
            width: "50%",
            textAlign: "center",
            backgroundColor: `${tab == 1 ? "red" : "white"}`,
            border: `${tab == 2 ? "1px solid black" : ""}`,
            padding: "0.3rem",
            cursor: "pointer",
          }}
        >
          Watch History
        </h3>
        <h3
          onClick={() => {
            setTab(2);
          }}
          style={{
            width: "50%",
            border: `${tab == 1 ? "1px solid black" : ""}`,
            textAlign: "center",
            backgroundColor: `${tab == 2 ? "red" : "white"}`,
            padding: "0.3rem",
            cursor: "pointer",
          }}
        >
          Search History
        </h3>
      </div>
      {tab == 1 ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.8rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Watch History</h3>
            {history.length > 0 && (
              <button
                onClick={() => {
                  localStorage.setItem("movies", JSON.stringify([]));
                  setHistory([]);
                }}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "0.6rem",
                  cursor: "pointer",
                  borderRadius: "0.3rem",
                }}
              >
                Delete All
              </button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.9rem",
            }}
          >
            <input
              type="text"
              placeholder="Search History..."
              value={searchTerm}
              onChange={(e) => {
                setsearchTerm(e.target.value);
                if (e.target.value.trim().length == 0) {
                  setHistory(JSON.parse(localStorage.getItem("movies")) || []);
                }
              }}
              style={{
                padding: "0.5rem",
                borderRadius: "0.3rem",
                border: "2px solid black",
              }}
            />
            <button
              style={{
                backgroundColor: "lightsalmon",
                border: "none",
                cursor: "pointer",
                marginLeft: "3px",
                borderRadius: "4px",
              }}
              onClick={() => {
                if (searchTerm.length > 0) {
                  const searchResult = history1.filter((searchTerm1) =>
                    searchTerm1.Title.toLowerCase().includes(searchTerm)
                  );
                  if (searchResult.length > 0) setHistory(searchResult);
                }
              }}
            >
              Search
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.7rem",
              flexWrap: "wrap",
            }}
          >
            {history.length > 0 ? (
              history.reverse().map((ele, id) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <MovieCard
                      id={id}
                      setHoveredDiv={setHoveredDiv}
                      hoveredDiv={hoveredDiv}
                      data={ele}
                      getMovieDetail={getMovieDetail}
                    />
                    <button
                      onClick={() => {
                        deleteInidividualMovie(ele.imdbID);
                      }}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        position: "relative",
                        top: "-14px",
                        padding: "0.6rem",
                        borderRadius: "0.4rem",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            ) : (
              <h3>Empty!!</h3>
            )}
          </div>
        </>
      ) : (
        tab == 2 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <h3 style={{ textAlign: "center" }}>Search History</h3>
              {JSON.parse(localStorage.getItem("searches"))?.length > 0 && (
                <button
                  onClick={() => {
                    localStorage.setItem("searches", JSON.stringify([]));
                    setSearches([]);
                  }}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "0.6rem",
                    cursor: "pointer",
                    borderRadius: "0.3rem",
                  }}
                >
                  Delete All
                </button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.4rem",
              }}
            >
              {JSON.parse(localStorage.getItem("searches"))?.length > 0 ? (
                searches.map((ele, id) => {
                  return (
                    <button
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        border: "none",
                        margin: 0,
                        marginBottom: "0.4rem",
                        backgroundColor: "orange",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      // onClick={() => {
                      //   navigate("/recommended/" + ele);
                      // }}
                    >
                      {ele}
                    </button>
                  );
                })
              ) : (
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  No Search History Available!!!
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default History;
