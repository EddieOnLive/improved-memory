import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getTorneosRequest } from "../api/torneos.api";
import {
  getInformeGeneralesRequest,
  getInformeClubesRequest,
} from "../api/informe.api";

function InformeTorneos() {
  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [selectedCriterio, setSelectedCriterio] = useState("1"); // Initialize with a default value

  useEffect(() => {
    cargarTorneos();
    if (selectedCriterio === "1") {
      getInformeGeneralesRequest()
        .then((response) => {
          setEquipos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (selectedCriterio === "2") {
      getInformeClubesRequest()
        .then((response) => {
          setEquipos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCriterio]);

  const cargarTorneos = async () => {
    try {
      const resp = await getTorneosRequest();
      const data = resp.data.map((element) => ({
        label: element.torneoDescripcion,
        value: element.id,
      }));
      setTorneos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCriterioChange = (event) => {
    setSelectedCriterio(event.target.value);
    // Fetch data for the selected criterio if necessary
    if (event.target.value === "2") {
      getInformeClubesRequest()
        .then((response) => {
          setEquipos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (event.target.value === "1") {
      getInformeGeneralesRequest()
        .then((response) => {
          setEquipos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="">
          <div className="">
            <h1 className="block text-5xl text-white uppercase font-bold text-center py-3">
              Informes
            </h1>
            <div className="">
              <button className="block text-center py-2 rounded-xl text-white w-full">
                <Link
                  to="/CargarPiezas/"
                  className="bg-indigo-500 px-2 py-1 rounded-md"
                >
                  Cargar Capturas
                </Link>
              </button>
              <button className="block text-center py-2 rounded-xl text-white w-full">
                <Link
                  to="/Inicio"
                  className="bg-indigo-500 px-2 py-1 rounded-md"
                >
                  Volver
                </Link>
              </button>
            </div>
            <div className="">
              <h1 className="block text-2xl text-white uppercase font-bold text-center py-3">
                Criterio de Informe
              </h1>
              <div className="flex justify-center">
                <select
                  name="criterio"
                  value={selectedCriterio}
                  onChange={handleCriterioChange}
                >
                  <option value="1">Generales</option>
                  <option value="2">Club</option>
                </select>
              </div>
              <div className="flex justify-center mt-1">
                <div className="container w-fit bg-slate-700">
                  {equipos.length > 0 && selectedCriterio == 1 ? (
                    <table name="1">
                      <thead className="text-xs font-semibold uppercase text-white bg-indigo-500">
                      <tr key={1}>
                      <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Planilla
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Timonel
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Acompañante
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Puntaje
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {equipos.map((equipo) => (
                          <tr key={equipo.equipoID}>
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.equipoID}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.nombreTimonel} {equipo.apellidoTimonel}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.nombreComp} {equipo.apellidoComp}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.puntajeTotal}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p></p>
                  )}
                  {equipos.length > 0 && selectedCriterio == 2 ? (
                    <table name="2">
                      <thead className="text-xs font-semibold uppercase text-white bg-indigo-500">
                      <tr key={2}>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Club</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Puntaje
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {equipos.map((equipo) => (
                          <tr key={equipo.clubID}> 
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.clubDescripcion}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap text-white">
                              <div className="text-left">
                                {equipo.puntajeTotal}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformeTorneos;
