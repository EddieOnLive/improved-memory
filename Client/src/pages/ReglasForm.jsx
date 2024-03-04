import { Form, Formik } from "formik";
import { useReglas } from "../context/ReglasProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReglasForm() {
  const { crearReglas, getRegla, actualizarRegla } = useReglas();
  const [regla, setRegla] = useState({
    articulo: "",
    descripcion: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const loadReglas = async () => {
      if (params.id) {
        const res = await getRegla(params.id);
        setRegla({
          articulo: res.articulo,
          descripcion: res.descripcion,
        });
      }
    };
    loadReglas();
  }, []);
  return (
    <div className="bg-slate-300 mx-auto max-w-sm rounded-md p-4 m x-auto mt-10">
      <Formik
        initialValues={regla}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await actualizarRegla(params.id, values);
          } else {
            //console.log(values);
            await crearReglas(values);
          }
          setRegla({
            articulo: "",
            descripcion: "",
          });
          navigate("/Reglas");
          actions.resetForm();
        }}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Editar Regla" : "Nueva Regla"}
            </h1>
            <label className="block uppercase text-center font-bold">
              Artículo
            </label>
            <input
              type="text"
              name="articulo"
              placeholder="Art. N"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.articulo}
              required
            />

            <label className="block uppercase text-center font-bold">
              Descripcion
            </label>
            <textarea
              name="descripcion"
              rows="3"
              placeholder="Escribe la descripción del artículo"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.descripcion}
              required
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
            <br />
          </Form>
        )}
      </Formik>
              <Link to="/Reglas" className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md text-center">
                Volver
              </Link>
            
    </div>
  );
}

export default ReglasForm;
