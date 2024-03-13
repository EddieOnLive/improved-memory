import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Formik } from "formik";
import { getPiezaRequest } from "../api/piezas.api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEquiposRequestTodos } from "../api/equipo.api";
import { crearCapturaRequest } from "../api/cargaPiezas.api";

function CargaPageForm() {
  const [piezas, setPiezas] = useState([]);
  const [piezas2, setPiezas2] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  let suma = 0;

  const [capturas, setCapturas] = useState({});
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
      setPiezas2(resp.data);
      setPiezas(data);
    } catch (error) {}
  };
  const cargarEquipos = async () => {
    try {
      let data = [];
      const resp = await getEquiposRequestTodos();
      resp.data.forEach((element) => {
        data.push({
          label:
            element.nombre_embarcacion + " - " + element.matricula_embarcacion,
          value: element.id,
        });
      });
      setEquipos(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [newValores, setNewValores] = useState([]);

  useEffect(() => {
    cargarPiezas();
    cargarEquipos();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-slate-300 w-96 rounded-md p-4 m x-auto mt-10 flex flex-col items-center container">
          <Formik
            initialValues={capturas}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (params.id) {
                console.log("hola");
              } else {
                newValores.map((valor) => {
                  const piezaEncontrada = piezas2.find(
                    (pieza) => pieza.id === valor.idPieza
                  );
                  const puntaje = piezaEncontrada ? piezaEncontrada.puntaje : 0;
                  const cantidad = piezaEncontrada ? valor.cantCaptura : 0;
                  suma = suma + puntaje * cantidad;
                });
                  const rep = await crearCapturaRequest({
                    equipoID: values.equipoID,
                    suma: suma,
                    capturas: newValores,
                  });
                  console.log(newValores);
                
              }
              
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form>
                <Select
                  options={equipos}
                  name="equipo"
                  onChange={(e) => {
                    values.equipoID = e.value;
                  }}
                  placeholder="Seleccione el equipo"
                  className="text-center"
                  inputId="aria-example-input"
                  required
                  tabSelectsValue="True"
                />

                <div className="container flex justify-center mt-3 mb-6">
                  <Select
                    options={piezas}
                    name="idPieza"
                    onChange={(e) => {
                      values.piezaID = e.value;
                    }}
                    placeholder="Lista de piezas"
                    className="text-center w-44 h-10 max-w-sm"
                    inputId="aria-example-input"
                    required
                    tabSelectsValue="True"
                  />
                  <input
                    type="number"
                    name="cant"
                    className="px-2 py-1 rounded-sm w-10 h-10 ml-2"
                    min={0}
                    max={3}
                    onChange={handleChange}
                    value={values.cant || ""}
                  />
                  <button
                    type="button"
                    className="bg-lime-800 px-2 py-1 text-white rounded-md w-10 h-10 ml-2"
                    onClick={() => {
                      const buscarPieza = piezas2.map((pieza) => {
                        if (pieza.id == values.piezaID) {
                          return pieza.descripcion;
                        }
                      });
                      const newValoresActualizados = [
                        ...newValores,
                        {
                          idPieza: values.piezaID,
                          descripcion: buscarPieza
                            .filter((valor) => valor !== undefined)
                            .join(),
                          cantCaptura: values.cant,
                        },
                      ];

                      setNewValores(newValoresActualizados);
                    }}
                  >
                    +
                  </button>
                </div>
                <hr className="h-0.5 border-t-0 bg-gray-600 dark:black/10" />
                <section className="antialiased text-gray-600 px-4 mt-5 bg-cover rounded">
                  <div className="flex flex-col justify-center ">
                    <div className="w-full max-w-xl mx-auto bg-slate-300 shadow-lg rounded-sm border border-gray-200">
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-white bg-indigo-500">
                              <tr>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Descripcion
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Cantidad
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Acciones
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-sm divide-y-2 divide-gray-100">
                              {newValores.length
                                ? newValores.map((invent) => (
                                    <tr key={invent.idPieza}>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {invent.descripcion}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {invent.cantCaptura}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <button
                                          type="button"
                                          className="px-4 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-lg"
                                          onClick={() => {
                                            setNewValores(
                                              newValores.filter(
                                                (newValor) =>
                                                  newValor.idPieza !=
                                                  invent.idPieza
                                              )
                                            );
                                          }}
                                        >
                                          -
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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
              to="/Informe/"
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
