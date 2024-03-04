import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  crearEquiposRequest,
  getEquiposRequestUno,
  updateEquiposRequest,
} from "../api/equipo.api";
import { getClubesRequest } from "../api/clubes.api";
import { getTorneosRequest } from "../api/torneos.api";

function InscripcionEquipoForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [equipo, setEquipo] = useState({
    nombreEmbarcacion: "",
    matriculaEmbarcacion: "",
    torneo: "",
    club: "",
    observacion: "",
    estado: "",
  });
  const [torneos, setTorneos] = useState([]);
  const [clubes, setClubes] = useState([]);

  const editEquipo = async () => {
    if (params.id) {
      const response = await getEquiposRequestUno(params.id);
      setEquipo({
        nombreEmbarcacion: response.data.nombre_embarcacion,
        matriculaEmbarcacion: response.data.matricula_embarcacion,
        torneo: response.data.torneoFK,
        club: response.data.clubsFK,
        observacion: response.data.observacion,
        estado: response.data.estado,
      });
    }
  };

  const cargarClubes = async () => {
    try {
      const resp = await getClubesRequest();
      setClubes(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cargarTorneos = async () => {
    try {
      const resp = await getTorneosRequest();
      setTorneos(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    cargarTorneos();
    cargarClubes();
    editEquipo();
  }, [params.id]);

  return (
    <div className="h-full bg-slate-300 rounded-md p-4 mx-auto flex justify-center items-center container max-w-lg mt-28">
      <div>
        <Formik
          initialValues={equipo}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (params.id) {
              await updateEquiposRequest(params.id, values);
            } else {
              await crearEquiposRequest(values);
            }
            navigate("/Inscripcion/");
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form>
              <div className="w-96 justify-center items-center">
                {/* Todo */}
                <div className="flex flex-col justify-center content-center">
                  {/* Título */}
                  <div>
                    <h1 className="block uppercase text-center font-bold text-2xl">
                      Nueva Inscripcion
                    </h1>
                  </div>
                  {/* Nombre Embarcación */}
                  <div>
                    <label className="block uppercase text-center font-bold">
                      Nombre de la Embarcación
                    </label>
                    <input
                      type="text"
                      name="nombreEmbarcacion"
                      placeholder="Titanic"
                      className="px-2 py-1 rounded-sm w-full text-center"
                      onChange={handleChange}
                      value={values.nombreEmbarcacion || ""}
                      required
                    />
                  </div>
                  {/* Matricula de la Embarcación */}
                  <div>
                    <label className="block uppercase text-center font-bold">
                      Matrícula de la Embarcación
                    </label>
                    <input
                      type="text"
                      name="matriculaEmbarcacion"
                      placeholder="XXXX-XXXX-XXXX"
                      className="px-2 py-1 rounded-sm w-full text-center"
                      onChange={handleChange}
                      value={values.matriculaEmbarcacion || ""}
                      required
                    />
                  </div>

                  {/* Club */}
                  <div className="container flex justify-center content-center self-center max-w-xl">
                    <select
                      name="club"
                      className="px-2 py-1 rounded-sm mt-1 text-center w-full"
                      onChange={handleChange}
                      value={values.club || ""}
                      required
                    >
                      <option value="">Seleccione un club</option>
                      {clubes.map((club) => (
                        <option
                          className="text-black"
                          key={club.id}
                          value={club.id}
                        >
                          {club.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Torneo */}
                  <div className="container flex justify-center content-center self-center max-w-xl">
                    <select
                      name="torneo"
                      className="px-2 py-1 rounded-sm mt-1 text-center w-full"
                      onChange={handleChange}
                      value={values.torneo || ""}
                      required
                    >
                      <option value="">Seleccione un Torneo</option>
                      {torneos.map((torneo) => (
                        <option
                          className="text-black"
                          key={torneo.id}
                          value={torneo.id}
                        >
                          {torneo.torneoDescripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Observación */}
                  <div>
                    <label className="block uppercase text-center font-bold">
                      Observación
                    </label>
                    <input
                      name="observacion"
                      type="text"
                      className="px-2 py-1 rounded-sm w-full h-40 text-start"
                      onChange={handleChange}
                      value={values.observacion || ""}
                    />
                  </div>
                  <div className="container flex justify-center content-center self-center">
                    <select
                      name="estado"
                      className="px-2 py-1 rounded-sm w-28 mt-1 text-center"
                      onChange={handleChange}
                      value={values.estado || ""}
                      required
                    >
                      <option value="">Seleccione un estado</option>
                      <option value="1">Activo</option>
                      <option value="2">Inactivo</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="container justify-center content-center flex">
          <Link
            to="/inscripcion/"
            className="block bg-indigo-500 px-2 py-1 mt-3 text-white w-20 rounded-md text-center"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InscripcionEquipoForm;
