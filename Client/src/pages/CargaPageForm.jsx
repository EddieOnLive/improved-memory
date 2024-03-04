import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik } from "formik";
import { getPiezaRequest } from "../api/piezas.api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEquiposRequestTodos } from "../api/equipo.api";

function CargaPageForm() {
  const [piezas, setPiezas] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [prevCarga, setPrevCarga] = useState([]);
  const [cargas, setCarga] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const cargarPiezas = async () => {
    try {
      let data = [];
      const resp = await getPiezaRequest();
      resp.data.forEach((element) => {
        data.push({
          label: element.descripcion,
          value: element.id,
        });
      });
      setPiezas(data);
    } catch (error) {}
  };

  const cargarEquipos = async () => {
    try {
      let data = [];
      const resp = await getEquiposRequestTodos();
      resp.data.forEach((element) => {
        data.push({
          label: element.id + " - " + element.nombre_embarcacion,
          value: element.id,
        });
      });
      setEquipos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    cargarPiezas();
    cargarEquipos();
  }, [params.id1]);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-slate-300 w-96 rounded-md p-4 m x-auto mt-10 flex flex-col items-center container">
          <Formik
            initialValues={piezas}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (params.id1) {
                /* await updatePescadoresRequest(params.id1, params.id2, values); */
              } else {
                /* const rep = await crearPescadoresRequest(values); */
              }
              /* navigate("/inscripcion/"); */
              console.log(cargas);
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form>
                <Select
                  options={equipos}
                  onChange={(e) => {
                    values.equipoID = e.value;
                    console.log(values);
                  }}
                  placeholder="Seleccione el equipo"
                  className="text-center"
                  inputId="aria-example-input"
                  required
                  tabSelectsValue="True"
                />
                <div className="flex justify-center columns-2">
                  <ul>
                    {piezas.map((pieza) => (
                      <li key={pieza.value}>
                        <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200">
                          <div className="pieza-info">{pieza.label}</div>
                          <div className="pieza-valor">
                            <input
                              type="number"
                              name={`pieza${pieza.value}`}
                              placeholder="0-3"
                              min={0}
                              max={3}
                              className="px-2 py-1 rounded-sm w-10 text-center ml-3"
                              value={values[`pieza${pieza.value}`] || 0}
                              onChange={(e) => {
                                handleChange(e);
                                setCarga((prevCarga) => {
                                  const updatedCargas = [...prevCarga];
                                  updatedCargas[e.target.name] = e.target.value;
                                  return updatedCargas;
                                });
                              }}
                              required
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </Form>
            )}
          </Formik>
          <div>
            <Link
              to="/Inscripcion/"
              className="block bg-indigo-500 px-2 py-1 mt-3 text-white w-20 rounded-md text-center"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CargaPageForm;
