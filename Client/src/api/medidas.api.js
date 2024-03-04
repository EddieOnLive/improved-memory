import axios from "axios";

export const getMedidasRequest = async () => {
  return await axios.get("http://localhost:4000/medidas");
};

export const crearMedidasRequest = async (medidas) => {
  return await axios.post("http://localhost:4000/medidas", medidas);
};

export const borrarMedidasRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/medidas/${id}`);
};

export const getMedidasRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/medidas/${id}`);
};

export const updateMedidasRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/medidas/${id}`,values);
}