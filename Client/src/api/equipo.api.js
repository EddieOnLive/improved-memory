import axios from "axios";

export const getEquiposRequest = async () => {
  return await axios.get("http://localhost:4000/equipo");
};

export const getEquiposRequestTodos = async () => {
  return await axios.get("http://localhost:4000/equipostodos");
};

export const crearEquiposRequest = async (Equipo) => {
  return await axios.post("http://localhost:4000/equipo", Equipo);
};

export const borrarEquiposRequest = async (id) => {
  return await axios.delete(`http://localhost:4000/equipo/${id}`);
};

export const getEquiposRequestUno = async (id) => {
  return await axios.get(`http://localhost:4000/equipo/${id}`);
};

export const updateEquiposRequest = async (id, values) => {
  return await axios.put(`http://localhost:4000/equipo/${id}`, values);
};
