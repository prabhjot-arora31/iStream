import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfHit, setNoOfHit] = useState(0);
  const navigate = useNavigate();
  const moreCountries = async () => {
    setIsLoading(true);
    setNoOfHit((prev) => prev + 1);
    const { data } = await axios.get(
      `https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/countries/${noOfHit}`
    );
    setCountries((prev) => [...prev, ...data.result.data]);
    setIsLoading(false);
  };
  const fetchCountry = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://streamitfree-api-personal.carrotappdevelopment.com/api/v1/streamitfree/countries/1"
    );
    setCountries(data.result.data);
    setNoOfHit((prev) => prev + 1);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCountry();

    return () => {};
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Search Movies By Countries</h2>
      {isLoading ? (
        "Loading"
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "7px",
          }}
        >
          {countries &&
            countries.map((country) => {
              return (
                <div
                  onClick={() => {
                    navigate("/country/" + country);
                  }}
                  style={{
                    padding: "0.6rem",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "0.7rem",
                  }}
                  key={country}
                >
                  {country}
                </div>
              );
            })}
          <button
            onClick={() => moreCountries()}
            style={{
              backgroundColor: "yellow",
              color: "black",
              borderRadius: "0.2rem",
              padding: "0.6rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default Country;
