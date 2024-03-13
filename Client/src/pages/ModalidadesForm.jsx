import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  crearModalidadesRequest,
  getModalidadesRequest,
  getModalidadesRequestUna,
  updateModalidadesRequest,
} from "../api/modalidades.api";

function ModalidadesForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [modalidades, setModalidades] = useState({
    descripcion: "",
  });

  const editModalidad = async () => {
    if (params.id) {
      const response = await getModalidadesRequestUna(params.id);
      setModalidades({ descripcion: response.data.descripcion });
    }
  };

  useEffect(() => {
    editModalidad();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-slate-300 w-96 rounded-md p-4 m x-auto mt-10 flex flex-col columns-1 items-center container">
          <h1 className="text-4xl font-bold text-center py-3 text-black">
            Nueva Modalidad
          </h1>
          <Formik
            initialValues={modalidades}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (params.id) {
                await updateModalidadesRequest(params.id, values);
              } else {
                await crearModalidadesRequest(values);
              }
              navigate("/ModalidadesPage/");
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form>
                <label className="block uppercase text-center font-bold">
                  Descripción
                </label>
                <input
                  type="text"
                  name="descripcion"
                  placeholder="Embarcación"
                  className="px-2 py-1 rounded-sm w-full"
                  onChange={handleChange}
                  value={values.descripcion || ""}
                  required
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
          <button className="block text-center py-2 rounded-xl text-white w-full">
            <Link
              to="/ModalidadesPage"
              className="bg-indigo-500 px-2 py-1 rounded-md"
            >
              Volver
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalidadesForm;
