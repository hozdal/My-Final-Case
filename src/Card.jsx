import React from "react";
import images from "./images.json";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  const image = images.find((x) => x.name === item.name).img;
  const parts = item.url.split("/");
  const id = parts[parts.length - 2];
  console.log(id);
  return (
    <div className="card card-compact bg-green-300 shadow-xl w-60 md:w-96 py-4">
      <div className="card-body ">
        <img className="w-full h-40  object-cover" src={image} alt={item} />
        <h2 className="card-title text-ellipsis">{item.name} </h2>
        <p>Model:{item.model}</p>
        <p>Hyperdrive Rating:{item.hyperdrive_rating}</p>
        <Link role="button" className="btn" to={`/${id}`}>
          Detay
        </Link>
      </div>
    </div>
  );
};

export default Card;
