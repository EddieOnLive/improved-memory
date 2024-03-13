import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import {
  crearTorneosRequest,
  getTorneosRequestUno,
  updateTorneosRequest,
} from "../api/torneos.api";
import { getModalidadesRequest } from "../api/modalidades.api";

function TorneosForm() {
  const navigate = useNavigate();
  const params = useParams();

  const editTorneo = async () => {
    if (params.id) {
      const response = await getTorneosRequestUno(params.id);
      setTorneo({
        modalidad: response.data.modalidad,
        fechaInicio: response.data.fechaInicio,
        horaInicio: response.data.horaInicio,
        fechaFin: response.data.fechaFin,
        horaFin: response.data.horaFin,
        descripcion: response.data.descripcion,
      });
    }
  };

  const [torneos, setTorneo] = useState({
    modalidad: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    descripcion: "",
  });

  const [modalidades, setModalidades] = useState([]);
  const cargarModalidades = async () => {
    try {
      const resp = await getModalidadesRequest();
      setModalidades(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarModalidades();
    editTorneo();
  }, [params.id]);

  return (
    <>
      <div className="bg-slate-300 max-w-m rounded-md p-4 m x-auto mt-10 flex-1">
        <h1 className="text-5xl text-black font-bold text-center py-3">
          Torneo Nuevo
        </h1>
        <Formik
          initialValues={torneos}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (params.id) {
              await updateTorneosRequest(params.id, values);
            } else {
              /* console.log(values); */
              await crearTorneosRequest(values);
            }
            navigate("/Torneos/");
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form>
              {/* Descripción */}
              <label className="block uppercase text-center font-bold">
                Descripción
              </label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                required
              />
              {/* Modalidad */}
              <label className="block uppercase text-center font-bold">
                Modalidad
              </label>
              <select
                name="modalidad"
                id="modalidad"
                className="px-2 py-1 rounded-sm w-full text-center"
                value={values.modalidad}
                onChange={handleChange}
                required
              >
                <option value="0">Seleccione una opcion</option>
                {modalidades.map((modalidad) => (
                  <option
                    className="text-black"
                    key={modalidad.id}
                    value={modalidad.id}
                  >
                    {modalidad.descripcion}
                  </option>
                ))}
              </select>
              {/* Fecha Inicio */}
              <label className="block uppercase text-center font-bold">
                Inicio
              </label>
              <div className="flex mt-0.5 mb-3">
                <input
                  type="datetime-local"
                  id="horaInicio"
                  name="horaInicio"
                  className="px-2 py-1 rounded-sm w-full ml-2 text-center"
                  value={values.horaInicio}
                  onChange={handleChange}
                  placeholder="hh:mm"
                  required
                />
              </div>
              {/* Fecha Finalización */}
              <label className="block uppercase text-center font-bold">
                Fin
              </label>
              <div className="flex mt-0.5 mb-1">
                <input
                  type="datetime-local"
                  id="horaFin"
                  name="horaFin"
                  className="px-2 py-1 rounded-sm w-full ml-2 text-center"
                  value={values.horaFin}
                  onChange={handleChange}
                  placeholder="hh:mm"
                  required
                />
              </div>

              <button
                type="submit"
                className="block bg-indigo-500 px-2 py-2 mt-5 text-white rounded-xl text-center w-full"
              >
                Aceptar
              </button>
              {/* {console.log(values.modalidad)} */}
            </Form>
          )}
        </Formik>
        <button className="block text-center py-2 mt-3 rounded-xl text-white w-full">
          <Link to="/Torneos" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
      </div>
    </>
  );
}

export default TorneosForm;
