import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Gallery.css";
const Gallery = () => {
  const { id, tv } = useParams();
  const [data, setdata] = useState([]);
  const [data2, setData2] = useState([]);
  const [detailedView, setDetailedView] = useState({
    isTrue: false,
    id: null,
    type: null,
  });
  useEffect(() => {
    (async () => {
      if (!tv) {
        const { data } = await axios.get(
          `https://api.tmdb.org/3/movie/${id}/images?api_key=13e53ff644a8bd4ba37b3e1044ad24f3`
        );
        const data2 = await axios.get(
          `https://api.tmdb.org/3/movie/${id}/videos?api_key=13e53ff644a8bd4ba37b3e1044ad24f3`
        );
        console.log(data);
        setData2(data2.data.results);
        console.log("data is: ", data2.data);
        setdata(data);
      } else {
        const { data } = await axios.get(
          `https://api.tmdb.org/3/tv/${id}/images?api_key=13e53ff644a8bd4ba37b3e1044ad24f3`
        );
        const data2 = await axios.get(
          `https://api.tmdb.org/3/tv/${id}/videos?api_key=13e53ff644a8bd4ba37b3e1044ad24f3`
        );
        setData2(data2.data.results);
        console.log("data is: ", data2.data);

        console.log(data);
        setdata(data);
      }
    })();

    return () => {};
  }, []);
  const bestLogo = data?.logos?.reduce((best, logo) => {
    if (!best || logo.width > best.width) {
      return logo;
    }
    return best;
  }, null);
  return (
    <div style={{ color: "white", position: "relative" }}>
      {detailedView.isTrue && (
        <div
          style={{
            position: "fixed",
            padding: "0.6rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "10",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${detailedView.id}`}
            style={{ margin: "0 auto" }}
          />
          <p
            onClick={() => {
              setDetailedView({ isTrue: false, id: null });
            }}
            style={{
              position: "absolute",
              top: 0,
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            X
          </p>
        </div>
      )}
      {data?.logos?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.7rem",
            opacity: detailedView.isTrue && "40%",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${bestLogo.file_path}`}
            height={"190px"}
            width={"190px"}
            style={{ margin: "0 auto" }}
          />
        </div>
      )}
      <h2
        style={{ textAlign: "center", opacity: detailedView.isTrue && "40%" }}
      >
        Backdrops
      </h2>
      <div
        className="backdrop"
        style={{
          padding: "0.5rem",
          display: "flex",
          opacity: detailedView.isTrue && "40%",
          scrollbarColor: "red",
          gap: "0.4rem",
          overflowX: "auto",
          margin: "0 auto",
          //   width: "100vw",
        }}
      >
        {data?.backdrops?.map((ele, id2) => {
          return (
            <img
              onClick={() => {
                setDetailedView({
                  isTrue: true,
                  id: ele.file_path,
                  type: "backdrop",
                });
              }}
              style={{ cursor: "pointer" }}
              src={`https://image.tmdb.org/t/p/w500/${ele.file_path}`}
              width={"290px"}
            />
          );
        })}
      </div>
      <h2
        style={{ textAlign: "center", opacity: detailedView.isTrue && "40%" }}
      >
        Posters
      </h2>
      <div
        className="posters"
        style={{
          padding: "0.5rem",
          display: "flex",
          overflowX: "auto",
          opacity: detailedView.isTrue && "40%",
          gap: "0.4rem",
          marginBottom: "0.4rem",
        }}
      >
        {data?.posters?.map((ele, id2) => {
          return (
            <img
              onClick={() => {
                setDetailedView({
                  isTrue: true,
                  id: ele.file_path,
                  type: "poster",
                });
              }}
              style={{ cursor: "pointer" }}
              src={`https://image.tmdb.org/t/p/w500/${ele.file_path}`}
              width={"210px"}
            />
          );
        })}
      </div>

      <h2
        style={{ textAlign: "center", opacity: detailedView.isTrue && "40%" }}
      >
        Videos
      </h2>
      <div
        className="posters"
        style={{
          padding: "0.5rem",
          display: "flex",
          overflowX: "auto",
          opacity: detailedView.isTrue && "40%",
          gap: "0.4rem",
          marginBottom: "0.4rem",
        }}
      >
        {data2.map((ele, id) => {
          return (
            <div>
              {ele.site == "YouTube" && (
                <iframe
                  src={`https://www.youtube.com/embed/${ele.key}`}
                  allowFullScreen
                />
              )}
              <p style={{ padding: "0.4rem", margin: 0, textAlign: "center" }}>
                {ele.name} <span style={{ color: "gray" }}>({ele.type})</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
