import * as React from "react";

const Artwork = () => {
  const props = {
    title: "Duck pond trail",
    medium: "watercolor",
    size: "9 X 12",
    year: "2023",
  };
  const { title, medium, size, year } = props;
  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <p className="artwork-description">{[medium, size].join(", ")}</p>
        <p className="artwork-year">{year}</p>
      </div>
    </div>
  );
};

export default Artwork;
