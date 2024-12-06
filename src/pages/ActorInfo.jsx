import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const ActorInfo = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDiv, setHoveredDiv] = useState("");
  useEffect(() => {
    const fetchIt = async () => {
      const { data } = await axios.get(
        `https://api.tmdb.org/3/person/${id}/combined_credits?api_key=ae4bd1b6fce2a5648671bfc171d15ba4`
      );
      console.log("hmm , data is:", data);
      setLoading(false);
      setMovies(data.cast);
    };
    fetchIt();
    return () => {};
  }, []);
  if (loading) {
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
    <div>
      <h2 style={{ textAlign: "center" }}>Filmography of {name}</h2>
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.7rem",
          flexWrap: "wrap",
        }}
      >
        {movies.map((m, i) => {
          return (
            <MovieCard
              data={m}
              key={i}
              id={i}
              setHoveredDiv={setHoveredDiv}
              hoveredDiv={hoveredDiv}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ActorInfo;
