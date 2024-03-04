import axios from "axios";

export const getReglaRequest = async () => {
  return await axios.get("http://localhost:4000/reglas");
};

export const crearReglaRequest = async (Regla) => {
  return await axios.post("http://localhost:4000/reglas", Regla);
};

export const borrarReglaRequest = async (id) => {
  console.log("Hola");
  return await axios.delete(`http://localhost:4000/reglas/${id}`);
};

export const getReglaRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/reglas/${id}`);
};

export const updateReglaRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/reglas/${id}`,values);
}