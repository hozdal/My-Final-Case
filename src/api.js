import axios from "axios";
export const detail = (id) => axios.get(`https://swapi.dev/api/starships/${id}`);
