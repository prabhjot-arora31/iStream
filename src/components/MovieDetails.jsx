import React from "react";
import "./MovieDetails.css";
const MovieDetails = ({ MovieDetail }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden", // Prevents scrollbars from appearing
        }}
      >
        <img
          src={
            MovieDetail.Cover
              ? MovieDetail.Cover
              : // : "https://i1.wp.com/psrinc.biz/wp-content/uploads/2018/03/photo-unavailable.jpg"
                "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }
          alt="Movie Cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the entire container
            opacity: "70%",
          }}
        />
      </div>

      <div
        style={{
          height: "500px",
          maxWidth: "880px",
          margin: "0 auto",
          position: "relative",
          top: "18px",
        }}
      >
        <iframe
          src={MovieDetail.Watch}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            borderRadius: "8px", // Optional: Add rounded corners if desired
          }}
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div
        style={{
          marginLeft: "0.6rem",
          marginTop: "1.7rem",
        }}
      >
        <h1
          className="title"
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            width: "fit-content",
            // color: "white",
            // background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
            // backdropFilter: "blur(90px)",
          }}
        >
          {MovieDetail.Title}
        </h1>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {/* <img src={MovieDetail.Cover} style={{ maxWidth: "660px" }} /> */}
          <p
            style={{
              margin: 0,
              fontWeight: "normal",
              fontSize: "16.3px",
              fontWeight: "500",
              maxWidth: "800px",
              textAlign: "left",
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
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {MovieDetail.Genre?.split(",").map((ele, id) => {
            return (
              <div
                id={id}
                style={{
                  padding: "0.4rem",
                  backgroundColor: "red",
                  color: "white",
                  marginTop: "0.9rem",
                }}
              >
                <p style={{ margin: 0 }}>{ele}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
