import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useNavigate, useParams } from "react-router-dom";

const CastAndCrew = () => {
  const { id, tv } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState([]);
  const [hover, setHover] = useState("");
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
      <h2 style={{ textAlign: "center" }}>Cast</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          flexWrap: "wrap",
        }}
      >
        {credits?.cast?.map((crew, id) => {
          return (
            <div
              style={{
                border: "2px solid black",
                padding: "0.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                gap: "0.3rem",
                height: "255px",
                borderRadius: "7px",
                transition: "0.2s ease-in-out",
                transform: hover == crew.id && "scale(1.043)",
                backgroundColor: hover == crew.id ? "lightgray" : "white",
              }}
              onClick={() => {
                if (crew.known_for_department == "Acting") {
                  navigate("/actor-info/" + crew.id + "/" + crew.name);
                }
              }}
              onMouseOver={() => {
                setHover(crew.id);
              }}
              onMouseLeave={() => {
                setHover();
              }}
            >
              <img
                style={{
                  borderRadius: "7px",
                }}
                src={
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                    : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                width={"120px"}
              />
              <h4 style={{ margin: 0 }}>{crew.name}</h4>
              <p style={{ margin: 0 }}>
                <span style={{ fontWeight: "bold" }}> Character: </span>
                <span>{crew.character}</span>
              </p>
              <p style={{ margin: 0 }}>
                <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
                {crew.gender == 0
                  ? "Not specified"
                  : crew.gender == 1
                  ? "Female"
                  : "Male"}
              </p>
            </div>
          );
        })}
      </div>
      <h2 style={{ textAlign: "center" }}>Crew </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          flexWrap: "wrap",
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
                backgroundColor: hover == id ? "lightgray" : "white",
                transform: hover == id && "scale(1.043)",

                cursor: "pointer",
                gap: "0.3rem",
                height: "255px",
                borderRadius: "7px",
                transition: ".2s ease-in-out",
              }}
              onMouseOver={() => {
                setHover(id);
              }}
              onMouseLeave={() => {
                setHover();
              }}
            >
              <img
                style={{
                  borderRadius: "7px",
                }}
                src={
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                    : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                width={"120px"}
              />
              <h4 style={{ margin: 0 }}>{crew.name}</h4>
              <p style={{ margin: 0 }}>
                <span style={{ fontWeight: "bold" }}> Department:</span>{" "}
                <span>{crew.department}</span>
              </p>
              <p style={{ margin: 0 }}>
                <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
                {crew.gender == 0
                  ? "Not specified"
                  : crew.gender == 1
                  ? "Female"
                  : "Male"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CastAndCrew;
