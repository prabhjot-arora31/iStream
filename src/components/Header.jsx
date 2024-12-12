import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const [headerTab, setHeaderTab] = useState(
    localStorage.getItem("headerTab") || 1
  );
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        paddingTop: "1.2rem",
      }}
    >
      <h1 style={{ textAlign: "center", margin: 0, marginBottom: "0.5rem" }}>
        <span style={{ color: "white", fontWeight: "bolder" }}>iS</span>
        <span style={{ color: "white", fontWeight: "bolder" }}>tre</span>
        <span style={{ color: "white", fontWeight: "bolder" }}>am</span>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: headerTab == 1 && location.pathname == "/" ? "red" : "white",
            padding: "0.3rem",
          }}
          onClick={() => {
            setHeaderTab(1);
            localStorage.setItem("headerTab", 1);
          }}
        >
          <h3
            style={{ cursor: "pointer", margin: 0, padding: 0 }}
            className="nav-link"
          >
            Home
          </h3>
        </Link>
        <Link
          to={"/history"}
          style={{
            textDecoration: "none",
            color: `${
              headerTab == 2 && location.pathname == "/history"
                ? "red"
                : "white"
            }`,
            padding: "0.3rem",
          }}
          onClick={() => {
            setHeaderTab(2);
            localStorage.setItem("headerTab", 2);
          }}
        >
          <h3
            style={{ cursor: "pointer", margin: 0, padding: 0 }}
            className="nav-link"
          >
            History
          </h3>
        </Link>
        {/* <Link to={"/country"} style={{ textDecoration: "none" }}>
          {" "}
          <h3 style={{ cursor: "pointer" }} className="nav-link">
            Country
          </h3>
        </Link>
        <Link to={"/genre"} style={{ textDecoration: "none" }}>
          {" "}
          <h3 style={{ cursor: "pointer" }} className="nav-link">
            Genre
          </h3>
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
