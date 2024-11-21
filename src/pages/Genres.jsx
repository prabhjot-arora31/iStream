import axios from "axios";
import React, { useEffect, useState } from "react";
import Puff from "react-loading-icons/dist/esm/components/puff";
import { useNavigate } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchGenres = async () => {
    const { data } = await axios.get(`
      https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/genres
            `);
    setGenres(data.result.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchGenres();

    return () => {};
  }, []);

  return (
    <div>
      {isLoading ? (
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
      ) : (
        <div>
          <h3 style={{ textAlign: "center" }}>
            Browse through the following genres to find your best fit!!!
          </h3>
          <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    padding: "1rem",
  }}
>
  {genres.map((genre, id) => {
    return (
      <div
        key={id}
        onClick={() => navigate("/genres/" + genre)}
        style={{
          padding: "0.7rem",
          backgroundColor: "blueviolet",
          color: "white",
          cursor: "pointer",
          borderRadius: "0.3rem",
          textAlign: "center",
          minWidth: "calc(100% / 2 - 16px)", // Two items per row on smaller screens
        }}
      >
        {genre}
      </div>
    );
  })}
</div>
          
        </div>
      )}
    </div>
  );
};

export default Genres;
