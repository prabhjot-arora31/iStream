import React from "react";
import logo from "../../logo.jpg";
const Footer = () => {
  return (
    <div
      style={{
        color: "white",
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={logo} width={"60px"} style={{}} />
      <p>
        This is an free streaming service for movies and TV Shows / series
        available worldwide.
      </p>
    </div>
  );
};

export default Footer;
