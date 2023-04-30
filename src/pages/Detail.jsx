import { useParams , Link} from "react-router-dom";
import { detail } from "../api";
import {useEffect, useState} from 'react'
import images from "../images.json";


function Detail() {
  const [data,setData] = useState(null);
 

  const { id } = useParams();
  useEffect(() => {
    detail(id).then(res => {
      setData(res.data);
    })
  }, []);

  if (!data) {
    return (
      <p>Data bulunamadı.</p>
    )
  }
  const image = images.find((x) => x.name === data.name).img;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-green-300 shadow-xl">
        <h2 className="w-full text-center ">{data.name}</h2>
        <figure>
          <img
            src={image}
            alt=""
          />
        </figure>
        <div className="card-body text-black">
          <p>Model: {data.model}</p>
          <p>Hyperdrive Rating: {data.hyperdrive_rating}</p>
          <p>Passengers: {data.passengers}</p>
          <p>Max. Atmosfering speed: {data.max_atmosphering_speed}</p>
          <p>Manufacturer: {data.manufacturer}</p>
          <p>Crew: {data.crew}</p>
          <p>Cargo Capacity: {data.cargo_capacity}</p>

          <div className="card-actions justify-end">
          <Link role="button" className="btn" to={"/"}>
          Geri
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
