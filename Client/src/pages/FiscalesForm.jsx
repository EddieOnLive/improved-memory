import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getHorariosRequest } from "../api/horarios.api";
import { getTorneosRequest } from "../api/torneos.api";
import {
  crearFiscalesRequest,
  getFiscalesRequestUno,
  updateFiscalesRequest,
} from "../api/fiscales.api";

function FiscalesForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [fiscales, setFiscales] = useState({
    horario: "",
    nombre: "",
    apellido: "",
    documento: "",
    contacto: "",
    usuario: "",
    password: "",
    torneoid: "",
  });

  const [horarios, setHorarios] = useState([]);
  const [torneos, setTorneos] = useState([]);

  const cargarHorarios = async () => {
    try {
      const resp = await getHorariosRequest();
      setHorarios(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarTorneos = async () => {
    try {
      const resp = await getTorneosRequest();
      setTorneos(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editFiscal = async () => {
    if (params.id) {
      const response = await getFiscalesRequestUno(params.id);
      setFiscales({
        horario: response.data.horario_FK,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        documento: response.data.documento,
        contacto: response.data.contacto,
        usuario: response.data.usuario,
        password: response.data.contraseña,
        torneoid: response.data.Torneo_FK,
      });
    }
  };

  useEffect(() => {
    cargarHorarios();
    cargarTorneos();
    editFiscal();
  }, [params.id]);

  return (
    <div className="grid-cols-2 flex justify-center">
      <div className="block">
        <div className="bg-slate-300 max-w-sm rounded-md p-4 m x-auto mt-10 container">
          <Formik
            initialValues={fiscales}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (params.id) {
                await updateFiscalesRequest(params.id, values);
              } else {
                await crearFiscalesRequest(values);
              }
              navigate("/Fiscales/");
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form>
                <h1 className="block uppercase text-center font-bold text-2xl">
                  Datos del Fiscal
                </h1>
                {/* ? Nombre */}
                <label className="block uppercase text-center font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Juan"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.nombre || ''}
                />
                {/* Apellido */}
                <label className="block uppercase text-center font-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Perez"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.apellido || ''}
                />
                {/* Documento */}
                <label className="block uppercase text-center font-bold">
                  Documento
                </label>
                <input
                  type="number"
                  name="documento"
                  placeholder="1234567"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.documento || ''}
                />
                <label className="block uppercase text-center font-bold">
                  Horario
                </label>
                <select
                  name="horario"
                  className="px-2 py-1 rounded-sm w-full"
                  value={values.horario || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una opcion</option>
                  {horarios.map((horario) => (
                    <option
                      className="text-black"
                      key={horario.id}
                      value={horario.id}
                    >
                      {horario.fechaEntrada} - {horario.horaEntrada}
                    </option>
                  ))}
                </select>
                {/* Contacto */}
                <label className="block uppercase text-center font-bold">
                  Contacto
                </label>
                <input
                  type="text"
                  name="contacto"
                  placeholder="0981 111 111"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.contacto || ''}
                />
                {/* usuario */}
                <label className="block uppercase text-center font-bold">
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Nombre de usuario"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.usuario || ''}
                />
                {/* Contraseña */}
                <label className="block uppercase text-center font-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  required
                  value={values.password || ''}
                />
                {/* Torneo en el que participa */}
                <label className="block uppercase text-center font-bold">
                  Torneo en el que participa
                </label>
                <select
                  name="torneoid"
                  className="px-2 py-1 rounded-sm w-full"
                  value={values.torneoid || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Elija una opción</option>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
                <br />
              </Form>
            )}
          </Formik>
          <button className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
          <Link to="/Fiscales/" className="bg-indigo-500 px-2 py-1">
            Volver
          </Link>
        </button>
        </div>
      </div>
    </div>
  );
}

export default FiscalesForm;
