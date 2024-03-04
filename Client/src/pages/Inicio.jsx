import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInicioRequestUno } from "../api/inicio.api";

function Inicio() {
  const [usuarios, setUsuario] = useState({
    usuario: "",
    password: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <div className="bg-slate-300 mx-auto max-w-sm rounded-md p-4 m x-auto mt-10">
        <Formik
          initialValues={usuarios}
          enableReinitialize={true}
          onSubmit={async (values) => {
            const inicio = await getInicioRequestUno(values.usuario, values.password);
            if (inicio.data.usuario_encontrado==1) {
              console.log("Si");
            } else {
              console.log("No");
            }
            console.log(values);
            /* navigate("/inscripcion/"); */
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form>
              <h1 className="block uppercase text-center font-bold text-2xl">
                Inicie Sesión
              </h1>
              {/* Usuario */}
              <label className="block uppercase text-center font-bold">
                Usuario
              </label>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                className="px-2 py-1 rounded-sm w-full placeholder:text-center"
                required
                value={values.usuario || ""}
                onChange={handleChange}
              />
              {/* Contraseña */}
              <label className="block uppercase text-center font-bold">
                Contrtaseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="px-2 py-1 rounded-sm w-full placeholder:text-center"
                required
                value={values.password || ""}
                onChange={handleChange}
              />
              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="block  
              bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
              >
                {isSubmitting ? "Accediendo..." : "Acceder"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Inicio;
