import axios from "axios";

export const getPiezaRequest = async () => {
  return await axios.get("http://localhost:4000/piezas");
};

export const crearPiezaRequest = async (piezas) => {
  return await axios.post("http://localhost:4000/piezas", piezas);
};

export const borrarPiezaRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/piezas/${id}`);
};

export const getPiezaRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/piezas/${id}`);
};

export const updatePiezaRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/piezas/${id}`,values);
}