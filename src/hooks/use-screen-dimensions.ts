import { useState, useEffect } from "react";

const getScreenDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export default () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getScreenDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getScreenDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
