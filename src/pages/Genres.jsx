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
              marginTop: "0.57rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            {genres.map((genre, id) => {
              return (
                <div
                  key={id}
                  onClick={() => {
                    navigate("/genres/" + genre);
                    localStorage.setItem("genre_page", 1);
                  }}
                  style={{
                    padding: "0.6rem",
                    backgroundColor: "purple",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    color: "white",
                    fontSize: "0.9rem", // Smaller font size for mobile
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
