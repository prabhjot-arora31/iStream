import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useNavigate, useParams } from "react-router-dom";

const CastAndCrew = () => {
  const { id, tv } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState([]);
  const [hover, setHover] = useState("");
  const [watchForCast, setWatchForCast] = useState(
    localStorage.getItem("watch-for-cast") || ""
  );
  const [watchForCastImg, setWatchForCastImg] = useState(
    localStorage.getItem("watch-for-cast-img") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const callAPI = async () => {
      const { data } = await axios.get(
        `https://api.tmdb.org/3/${
          tv?.length > 0 ? "tv" : "movie"
        }/${id}/credits?api_key=fafef439971c0bedf1c12e7a5be971c2`
      );
      console.log("in cast :", data);
      setIsLoading(false);
      setCredits(data);
    };
    callAPI();
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "30px",
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
    <>
      {watchForCast && (
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "28.3px",
            marginTop: "30px",
          }}
        >
          {watchForCast}
        </h1>
      )}
      {watchForCastImg && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={
              watchForCastImg
                ? watchForCastImg.includes("themoviedb")
                  ? "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                  : watchForCastImg ||
                    "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
                : "https://image.tmdb.org/t/p/w1280" + watchForCastImg
            }
            alt="Movie Cover"
            style={{
              objectFit: "cover",
              width: "100%",
              maxWidth: "850px",
              margin: "0 auto",
              height: "auto",
            }}
          />
        </div>
      )}
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: 0,
          marginTop: "45px",
        }}
      >
        Cast
      </h2>
      <div
        style={{
          width: "60px",
          height: "3px",
          backgroundColor: "red",
          margin: "0 auto",
          marginBottom: "18px",
        }}
      >
        {" "}
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarColor: "black red",
          gap: "0.6rem",
        }}
      >
        {credits?.cast?.map((crew, id) => {
          return (
            <div
              style={{
                border: "2px solid black",
                padding: "0.4rem",
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
                //transform: hover === crew.id ? "scale(1.043)" : "scale(1)",
                backgroundColor: hover === crew.id ? "white" : "black",
              }}
              onClick={() => {
                localStorage.setItem("actor-photo", crew.profile_path);
                navigate("/actor-info/" + crew.id + "/" + crew.name);
              }}
              onMouseOver={() => {
                setHover(crew.id);
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
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                    : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                width={"140px"}
                height={"140px"}
              />
              <h4
                style={{
                  margin: 0,
                  color: hover === crew.id ? "black" : "white",
                }}
              >
                {crew?.name?.length > 14
                  ? crew?.name?.substring(0, 14) + "..."
                  : crew?.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  color: crew.character ? "gray" : "black",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{crew?.character}</span>
              </p>
            </div>
          );
        })}
      </div>
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
      <h2
        style={{
          textAlign: "center",
          color: "white",
          margin: 0,
          marginTop: "45px",
        }}
      >
        Crew
      </h2>
      <div
        style={{
          width: "75px",
          height: "3px",
          backgroundColor: "red",
          margin: "0 auto",
          marginBottom: "18px",
        }}
      >
        {" "}
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarColor: "black red",
          gap: "0.6rem",
          paddingBottom: "2rem",
        }}
      >
        {credits?.crew?.map((crew, id) => {
          return (
            <div
              style={{
                border: "2px solid black",
                padding: "0.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: hover === id ? "white" : "black",
                //transform: hover === id ? "scale(1.043)" : "scale(1)",
                cursor: "pointer",
                gap: "0.3rem",
                borderRadius: "7px",
                transition: ".2s ease-in-out",
                height: "200px",
                width: "160px",
              }}
              onMouseOver={() => {
                setHover(id);
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
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                    : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                width={"140px"}
                height={"140px"}
              />
              <h4
                style={{
                  margin: 0,
                  color: hover === id ? "black" : "white",
                }}
              >
                {crew?.name?.length > 14
                  ? crew?.name?.substring(0, 14) + "..."
                  : crew?.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  color: "gray",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{crew?.department}</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CastAndCrew;
