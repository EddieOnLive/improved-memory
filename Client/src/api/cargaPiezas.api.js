import axios from "axios";

export const getCapturaRequest = async () => {
  return await axios.get("http://localhost:4000/capturas");
};

export const crearCapturaRequest = async (capturas) => {
  return await axios.post("http://localhost:4000/capturas", capturas);
};

export const borrarCapturaRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/capturas/${id}`);
};

export const getCapturaRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/capturas/${id}`);
};

export const updateCapturaRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/capturas/${id}`,values);
}