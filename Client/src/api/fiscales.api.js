import axios from "axios";

export const getFiscalesRequest = async () => {
  return await axios.get("http://localhost:4000/fiscal");
};

export const crearFiscalesRequest = async (Fiscal) => {
  return await axios.post("http://localhost:4000/fiscal", Fiscal);
};

export const borrarFiscalesRequest = async (id) => {
  /* console.log("Hola"); */
  return await axios.delete(`http://localhost:4000/fiscal/${id}`);
};

export const getFiscalesRequestUno = async (id) => {
  return await axios.get(`http://localhost:4000/fiscal/${id}`);
};

export const updateFiscalesRequest = async (id, values) => {
  return await axios.put(`http://localhost:4000/fiscal/${id}`, values);
};
