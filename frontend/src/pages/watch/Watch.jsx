import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import React from "react";
import ReactPlayer from "react-player";
import Error from "../../components/error/Error";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie || location.state.movie;
  const isYouTubeVideo =
    movie &&
    movie.video &&
    typeof movie.video === "string" &&
    movie.video.startsWith("https://www.youtube.com");
  return (
    <div className="watch">
      {isYouTubeVideo ? (
        <ReactPlayer width="100%" height="100%" url={movie.video} controls />
      ) : (
        <video className="video" autoPlay controls src={movie.video} />
      )}
      {/* {!movie.video.includes("youtube.com") ? (
        <video className="video" autoPlay progress controls src={movie.video} />
      ) : (
        <ReactPlayer width="100%" height="100%" url={movie.video} controls />
      )} */}
    </div>
  );
}
