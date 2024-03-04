import axios from "axios";

export const getModalidadesRequest = async () => {
  return await axios.get("http://localhost:4000/modalidades");
};

export const crearModalidadesRequest = async (modalidades) => {
  return await axios.post("http://localhost:4000/modalidades", modalidades);
};

export const borrarModalidadesRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/modalidades/${id}`);
};

export const getModalidadesRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/modalidades/${id}`);
};

export const updateModalidadesRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/modalidades/${id}`,values);
}