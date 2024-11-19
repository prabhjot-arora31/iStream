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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Puff stroke="#ff0000" strokeOpacity={20.125} speed={0.75} />
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
            }}
          >
            {genres.map((genre) => {
              return (
                <div
                  onClick={() => {
                    navigate("/genres/" + genre);
                  }}
                  style={{
                    padding: "0.7rem",
                    backgroundColor: "blueviolet",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "0.3rem",
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
