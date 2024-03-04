import axios from "axios";

export const getClubesRequest = async () => {
  return await axios.get("http://localhost:4000/clubes");
};

export const crearClubRequest = async (Club) => {
  return await axios.post("http://localhost:4000/clubes", Club);
};

export const borrarClubesRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/clubes/${id}`);
};

export const getClubRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/clubes/${id}`);
};

export const updateClubRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/clubes/${id}`,values);
}