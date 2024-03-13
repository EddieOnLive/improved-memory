import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  crearMedidasRequest,
  getMedidasRequestUna,
  updateMedidasRequest,
} from "../api/medidas.api";

function MedidasForm() {
  const [medida, setMedida] = useState({
    medida: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  const editMedidas = async () => {
    const response = await getMedidasRequestUna(params.id);
    setMedida(response.data);
  };

  useEffect(() => {
    if (params.id) {
      editMedidas();
    }
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-96 container">
          <div className="p-10 bg-slate-300 container">
            <h1 className="text-3xl text-black font-bold text-center mb-4">
              Medidas Para Piezas
            </h1>
            <Formik
              initialValues={medida}
              enableReinitialize={true}
              onSubmit={async (values) => {
                if (params.id) {
                  await updateMedidasRequest(params.id, values);
                } else {
                  await crearMedidasRequest(values);
                }
                navigate("/MedidasPage/");
              }}
            >
              {({ handleSubmit, handleChange, values, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <label className="block uppercase text-black text-center font-bold">
                      Medida Deseada en centímetros
                    </label>
                    <input
                      type="number"
                      name="medida"
                      placeholder="10"
                      className="px-2 py-1 rounded-sm w-full text-center"
                      value={values.medida || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
              to="/MedidasPage"
              className="bg-indigo-500 px-2 block text-center py-2 rounded-xl mt-10 text-white w-full"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedidasForm;
