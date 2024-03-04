import axios from "axios";

export const getPescadoresRequest = async () => {
  return await axios.get("http://localhost:4000/pescadores");
};

export const crearPescadoresRequest = async (pescadores) => {
  return await axios.post("http://localhost:4000/pescadores", pescadores);
};

export const borrarPescadoresRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/pescadores/${id}`);
};

export const getPescadoresRequestUno = async (id) => {
  return await axios.get(`http://localhost:4000/pescadores/${id}`);
};

export const updatePescadoresRequest = async (id1, id2, values) =>{
  return await axios.put(`http://localhost:4000/pescadores/${id1}/${id2}`,values);
}