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
  const [actorProfile, setActorProfile] = useState(localStorage.getItem('actor-photo') || '');
  useEffect(() => {
    const fetchIt = async () => {
      const { data } = await axios.get(
        `https://api.tmdb.org/3/person/${id}/combined_credits?api_key=ae4bd1b6fce2a5648671bfc171d15ba4`
      );
      console.log("hmm , data is:", data);
      setLoading(false);
      setMovies(data);
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
      <h2 style={{ textAlign: "center" , fontWeight:'900'}}>Filmography of {name}</h2>
      {actorProfile && <div style={{ display:'flex', justifyContent:'center'}}><img style={{margin:'10px auto', width:'160px', height:'160px',objectFit: "cover", borderRadius:'50%'}} 
        src={`https://image.tmdb.org/t/p/w500${actorProfile}`}
        /> </div>}
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
        {movies.cast.map((m, i) => {
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
        {movies.crew.map((m, i) => {
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
