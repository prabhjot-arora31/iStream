import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <span style={{ color: "purple" }}>iS</span>
        <span style={{ color: "darkblue" }}>tre</span>
        <span style={{ color: "darkgoldenrod" }}>am</span>
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h3 style={{ cursor: "pointer" }} className="nav-link">
            Home
          </h3>
        </Link>
        <Link to={"/history"} style={{ textDecoration: "none" }}>
          <h3 style={{ cursor: "pointer" }} className="nav-link">
            History
          </h3>
        </Link>
        <Link to={"/country"} style={{ textDecoration: "none" }}>
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
        </Link>
      </div>
    </div>
  );
};

export default Header;
