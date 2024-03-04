import axios from "axios";

export const getCategoriasRequest = async () => {
  return await axios.get("http://localhost:4000/categorias");
};

export const crearCategoriasRequest = async (categorias) => {
  return await axios.post("http://localhost:4000/categorias", categorias);
};

export const borrarCategoriasRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/categorias/${id}`);
};

export const getCategoriasRequestUna = async (id) => {
  return await axios.get(`http://localhost:4000/categorias/${id}`);
};

export const updateCategoriasRequest = async (id, values) =>{
  return await axios.put(`http://localhost:4000/categorias/${id}`,values);
}