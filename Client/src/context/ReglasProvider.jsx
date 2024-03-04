import { useContext, useState } from "react";
import { ReglasContext } from "./ReglasContext";
import {
  getReglaRequest,
  borrarReglaRequest,
  crearReglaRequest,
  getReglaRequestUna,
  updateReglaRequest
} from "../api/regla.api";

export const useReglas = () => {
  const context = useContext(ReglasContext);
  if (!context) {
    throw new Error("useReglas must be used within a TaskContextProvider");
  }
  return context;
};

export const ReglasContextProvider = ({ children }) => {
  const [reglas, setReglas] = useState([]);

  async function loadTareas() {
    const respuesta = await getReglaRequest();
    //console.log(respuesta.data);
    setReglas(respuesta.data);
  }

  const getRegla = async (id) =>{
    try {
      const response = await getReglaRequestUna(id)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const crearReglas = async (values) => {
    try {
      const respuesta = await crearReglaRequest(values);
      //console.log(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarReglas = async (id) => {
    try {
      const respuesta = await borrarReglaRequest(id);
      setReglas(reglas.filter((reglas) => reglas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarRegla = async (id, values)=>{
    try {
      await updateReglaRequest(id, values)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ReglasContext.Provider
      value={{ reglas, loadTareas, borrarReglas, crearReglas, getRegla, actualizarRegla }}
    >
      {children}
    </ReglasContext.Provider>
  );
};
