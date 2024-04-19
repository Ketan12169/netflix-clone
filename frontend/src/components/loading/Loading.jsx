import React from "react";
import "./loading.scss";
import { CircularProgress } from "@material-ui/core";

export default function Loading() {
  return (
    <div className="Loading">
      <CircularProgress color="white" />
    </div>
  );
}
