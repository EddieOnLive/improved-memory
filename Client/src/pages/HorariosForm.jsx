import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  crearHorariosRequest,
  getHorariosRequestUna,
  updateHorariosRequest,
} from "../api/horarios.api";
import { string } from "prop-types";

function HorariosForm() {
  const navigate = useNavigate();
  const params = useParams();

  const editHorario = async () => {
    if (params.id) {
      const response = await getHorariosRequestUna(params.id);
      const aux1 = response.data.horaEntrada;
      const aux2 = response.data.horaSalida;
      console.log(aux1.substring(0, aux1.length - 8));
      console.log(aux2.substring(0, aux2.length - 8));

      const aux3 = aux1.substring(0, aux1.length - 8);
      const aux4 = aux2.substring(0, aux2.length - 8);

      setHorarios({
        horaEntrada: aux3,
        horaSalida: aux4,
        /* horaEntrada: response.data.horaEntrada,
        horaSalida: response.data.horaSalida, */
      });
      /* console.log(horarios); */
    }
  };

  const [horarios, setHorarios] = useState({
    horaEntrada: "",
    horaSalida: "",
  });

  useEffect(() => {
    editHorario();
  }, [params.id]);

  return (
    <>
      <div>
        <div className="bg-slate-300 max-w-m rounded-md p-4 m x-auto mt-10 flex-1">
          <h1 className="text-5xl text-black font-bold text-center py-3">
            Horario Nuevo
          </h1>
          <Formik
            initialValues={horarios}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (params.id) {
                await updateHorariosRequest(params.id, values);
              } else {
                await crearHorariosRequest(values);
                console.log(values);
              }
              navigate("/Horarios/");
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form>
                {/* Fecha de Inicio */}
                <label className="block uppercase text-center font-bold">
                  Entrada
                </label>
                <div className="flex mt-0.5 mb-3">
                  <input
                    type="datetime-local"
                    id="horaEntrada"
                    name="horaEntrada"
                    className="px-2 py-1 rounded-sm w-full ml-2 text-center"
                    value={values.horaEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Fecha Finalización */}
                <label className="block uppercase text-center font-bold">
                  Salida
                </label>
                <div className="flex mt-0.5 mb-1">
                  <input
                    type="datetime-local"
                    id="horaSalida"
                    name="horaSalida"
                    className="px-2 py-1 rounded-sm w-full ml-2 text-center"
                    value={values.horaSalida}
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
              </Form>
            )}
          </Formik>
          <button className="block text-center py-2 rounded-xl text-white w-full">
            <Link to="/Horarios" className="bg-indigo-500 px-2 py-1 rounded-md">
              Volver
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default HorariosForm;
