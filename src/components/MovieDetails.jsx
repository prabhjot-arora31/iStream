import React from "react";
import "./MovieDetails.css";
const MovieDetails = ({ MovieDetail }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="title" style={{ textAlign: "center" }}>
        {MovieDetail.Title}
      </h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img src={MovieDetail.Cover} style={{ maxWidth: "660px" }} />
        <p>{MovieDetail.Description}</p>
      </div>
      <div style={{ height: "500px" }}>
        <iframe
          src={MovieDetail.Watch}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px", // Optional: Add rounded corners if desired
          }}
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieDetails;
