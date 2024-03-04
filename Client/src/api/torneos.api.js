import axios from "axios";

export const getTorneosRequest = async () => {
  return await axios.get("http://localhost:4000/torneos");
};

export const crearTorneosRequest = async (Torneo) => {
  return await axios.post("http://localhost:4000/torneos", Torneo);
};

export const borrarTorneosRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/torneos/${id}`);
};

export const getTorneosRequestUno = async (id) => {
  return await axios.get(`http://localhost:4000/torneos/${id}`);
};

export const updateTorneosRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/torneos/${id}`,values);
}