import axios from "axios";

export const getHorariosRequest = async () => {
  return await axios.get("http://localhost:4000/horarios");
};

export const crearHorariosRequest = async (Horarios) => {
  return await axios.post("http://localhost:4000/horarios", Horarios);
};

export const borrarHorariosRequest = async (id) => {
  console.log("Hola");
  return await axios.delete(`http://localhost:4000/horarios/${id}`);
};

export const getHorariosRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/horarios/${id}`);
};

export const updateHorariosRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/horarios/${id}`,values);
}