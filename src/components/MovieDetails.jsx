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
      <h1 className="title" style={{ textAlign: "center" }}>
        {MovieDetail.Title}
      </h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img src={MovieDetail.Cover} style={{ maxWidth: "660px" }} /> */}
        <p
          style={{
            margin: 0,
            fontWeight: "normal",
            fontSize: "17px",
            maxWidth: "800px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          {MovieDetail.Description}
        </p>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          {MovieDetail.Release} | {MovieDetail.Duration} min |{" "}
          {MovieDetail.Country}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          justifyContent: "center",
        }}
      >
        {MovieDetail.Genre.split(",").map((ele, id) => {
          return (
            <p
              style={{
                padding: "0.4rem",
                backgroundColor: "red",
                color: "white",
              }}
            >
              {ele}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDetails;
