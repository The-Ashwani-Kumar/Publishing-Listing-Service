import React, { useState } from "react";

export default function Card({
  title = "",
  description = "",
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="w-1/5 m-5">
      <h1
        className="p-3 text-white cardH1 text-3xl"
        style={{ backgroundColor: "#FF7F50", borderRadius: "30px" }}
      >
        {title}
      </h1>
      <p
        className="p-3 m-2"
        style={{ border: "solid 1px rgb(255, 127, 80)", borderRadius: "30px" }}
      >
        {showFullDescription ? description : `${description.slice(0, 80)}...`}
      </p>
      {!showFullDescription ? (
        <button onClick={toggleDescription} className="text-blue-500">
          Read more
        </button>
      ) : (
        <button onClick={toggleDescription} className="text-blue-500">
          Read less
        </button>
      )}
    </div>
  );
}
