import { useState, useEffect } from "react";
import isBrowser from "../util/is-browser";

export const getScreenDimensions = () => {
  if (isBrowser) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  return {
    width: 0,
    height: 0,
  };
};

export default () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getScreenDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getScreenDimensions());
    };

    if (window) window.addEventListener("resize", handleResize);
    return () => window && window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
