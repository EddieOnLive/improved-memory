import axios from "axios";

export const getInformeGeneralesRequest = async () => {
  return await axios.get("http://localhost:4000/informetodos");
};

export const getInformeClubesRequest = async () =>{
  return await axios.get("http://localhost:4000/informeclubes")
}

export const crearInformeRequest = async (Informes) => {
  return await axios.post("http://localhost:4000/informe", Informes);
};

export const getInformeRequestUno = async (id) => {
  return await axios.get(`http://localhost:4000/informe/${id}`);
};