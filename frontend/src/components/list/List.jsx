import {
  ArrowBackIosOutlined,
  ArrowBackIosRounded,
  ArrowForwardIosOutlined,
  ArrowForwardIosRounded,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  useEffect(() => {
    const clickLimit = window.innerWidth / 262;
    listRef.current.style.transform = `translateX(${-slideNumber * 262}px)`;
  }, [slideNumber]);

  const handleClick = (direction) => {
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    }
    if (direction === "right" && slideNumber < list.content.length - 5) {
      setSlideNumber(slideNumber + 1);
    }
    {
      console.log(slideNumber);
    }
    {
      console.log(list.content.length);
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <div
          className="left-arrow"
          style={{ display: slideNumber === 0 ? "none" : "block" }}
        >
          <ArrowBackIosRounded
            disabled={slideNumber === 0}
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: slideNumber === 0 ? "none" : "block" }}
          />
        </div>
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} />
          ))}
        </div>
        <div className="right-arrow">
          <ArrowForwardIosRounded
            disabled={slideNumber === 10}
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </div>
  );
}
