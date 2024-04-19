import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && <img src={movie?.img} style={{ border: "none" }} />}
      {isHovered && (
        <>
          {/* {console.log(movie.trailer)} */}

          {movie?.trailer && !movie.trailer.includes("youtube.com") ? (
            <video
              className="video"
              style={{ width: "100%", height: "200px" }}
              autoPlay
              progress
              controls
              src={movie.trailer}
            />
          ) : (
            <ReactPlayer
              className="react-player"
              url={movie.trailer}
              width="100%"
              height="200px"
              controls
              playing={true}
            />
          )}
          <div className="itemInfo">
            <div className="icons">
              <Link to={{ pathname: "/watch", movie: movie }}>
                <PlayArrow className="icon" />
              </Link>
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
