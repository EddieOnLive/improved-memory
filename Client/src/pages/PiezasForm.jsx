import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedidasRequest } from "../api/medidas.api";
import {
  crearPiezaRequest,
  getPiezaRequestUna,
  updatePiezaRequest,
} from "../api/piezas.api";

function PiezasForm() {
  const [pieza, setPieza] = useState({
    descPieza: "",
    tipoPieza: "",
    puntajePieza: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const editPieza = async () => {
    if (params.id) {
      const response = await getPiezaRequestUna(params.id);
      setPieza({
        descPieza: response.data.descripcion,
        tipoPieza: response.data.tipo_piezaFK,
        puntajePieza: response.data.puntaje,
      });
    }
  };

  const [medidas, setMedidas] = useState([]);
  const cargarMedidas = async () => {
    try {
      const resp = await getMedidasRequest();
      setMedidas(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    editPieza();
    cargarMedidas();
  }, [params.id]);

  return (
    <>
      <div className="h-screen bg-zinc-900 container">
        <Formik
          initialValues={pieza}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (params.id) {
              await updatePiezaRequest(params.id, values);
            } else {
              await crearPiezaRequest(values);
            }
            navigate("/Piezas/");
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form>
              <h1 className="text-5xl text-white font-bold text-center py-3">
                Piezas
              </h1>
              <label className="block uppercase text-white text-center font-bold">
                Nombre de la Pieza
              </label>
              <input
                type="text"
                name="descPieza"
                placeholder="Dorado"
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.descPieza}
                required
              />
              <label className="block uppercase text-center font-bold text-white">
                Medida requerida
              </label>
              <select
                name="tipoPieza"
                className="px-2 py-1 rounded-sm w-full"
                value={values.tipoPieza}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opcion</option>
                <option value="0">Sin medida</option>
                {medidas.map((medida) => (
                  <option
                    className="text-black"
                    key={medida.id}
                    value={medida.id}
                  >
                    {medida.medida} CM
                  </option>
                ))}
              </select>
              <label className="block uppercase text-white text-center font-bold">
                Puntaje de la pieza
              </label>
              <input
                type="number"
                name="puntajePieza"
                placeholder="50"
                className="px-2 py-1 rounded-sm w-full"
                value={values.puntajePieza}
                required
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="block bg-indigo-500 px-2 py-1 mt-4 text-white w-full rounded-md"
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </Form>
          )}
        </Formik>
        <Link
          to="/Piezas"
          className="bg-indigo-500 px-2 block text-center py-2 rounded-xl mt-10 text-white w-full"
        >
          Volver
        </Link>
      </div>
    </>
  );
}

export default PiezasForm;
