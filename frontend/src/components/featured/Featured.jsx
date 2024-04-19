import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  // console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category" style={{ border: "none" }}>
          <span className="Moviesorseries">
            {type === "movie" ? "Movies" : "Series"}
          </span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
            <option value="romantic">Romance</option>
          </select>
        </div>
      )}

      {/* {console.log(content.img)} */}
      <img
        src={content.img}
        style={{
          opacity: imageLoaded ? 1 : 0,
          border: "none",
          transition: "opacity 0.5s",
        }}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="info">
        <h1>{content.title}</h1>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button
            className="play"
            onClick={() => {
              history.push("/watch", { movie: content });
            }}
          >
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
