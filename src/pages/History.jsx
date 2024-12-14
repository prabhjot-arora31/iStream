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
    const filteredItems = history.filter((item) => item.id !== id);
    localStorage.setItem("movies", JSON.stringify(filteredItems));
    setHistory(filteredItems);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          maxWidth: "550px",
          margin: "0 auto",
        }}
      >
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
            <h3 style={{ textAlign: "center", color: "white" }}>
              Watch History
            </h3>
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
                if (e.target.value.trim().length === 0) {
                  setHistory([...history1]);
                }
                //  if (e.target.value.trim().length == 0) {
                //  setHistory(JSON.parse(localStorage.getItem("movies")) || []);
                //  }
              }}
              style={{
                outline: "none",
                padding: "0.5rem",
                borderRadius: "0.3rem",
                backgroundColor: "black",
                border: "2px solid white",
                color: "white",
              }}
            />
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
              style={{
                backgroundColor: "black",
                border: "1px solid white",
                cursor: "pointer",
                color: "white",
                marginLeft: "3px",
                borderRadius: "4px",
              }}
              onClick={() => {
                if (searchTerm.length > 0) {
                  const lowerCaseSearchTerm = searchTerm.toLowerCase();
                  const searchResult = history1.filter((searchTerm1) => {
                    return (
                      searchTerm1.name
                        ?.toLowerCase()
                        .includes(lowerCaseSearchTerm) ||
                      searchTerm1.title
                        ?.toLowerCase()
                        .includes(lowerCaseSearchTerm)
                    );
                  });
                  if (searchResult.length > 0) {
                    setHistory(searchResult);
                  } else {
                    setHistory([]); // Clear results if no matches are found
                  }
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
              gap: "0.2rem",
              margin: 0,
              alignItems: "center",
              marginBottom: "1.6rem",
            }}
          >
            <h4 style={{ margin: 0, color: "white" }}>Total: </h4>
            <p style={{ margin: 0, color: "white" }}>{history.length}</p>
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
              [...history].reverse().map((ele, id) => {
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
                        deleteInidividualMovie(ele.id);
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
              <h3 style={{ textAlign: "center", color: "white" }}>
                Search History
              </h3>
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
