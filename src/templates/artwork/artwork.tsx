import * as React from "react";

// todo: figure out how to type props here
const Artwork = ({ data }: { data: any }) => {
  const props = {
    title: "Duck pond trail",
    medium: "watercolor",
    size: "9 X 12",
    year: "2023",
  };
  const { title, medium, size, year } = props;
  console.log("from sanity:", data);
  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <p className="artwork-description">{[medium, size].join(", ")}</p>
        <p className="artwork-year">{year}</p>
        <p>data that came from Sanity...</p>
        <p>{data?.slug}</p>
      </div>
    </div>
  );
};

export default Artwork;
