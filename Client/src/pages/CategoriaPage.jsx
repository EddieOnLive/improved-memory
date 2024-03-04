import { useNavigate, Link } from "react-router-dom";
import { borrarCategoriasRequest, getCategoriasRequest } from "../api/categorias.api";
import { useEffect, useState } from "react";

function CategoriaPescador() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const resp = await getCategoriasRequest();
      setCategorias(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarCategoria = async (id) => {
    try {
      const resp = await borrarCategoriasRequest(id);
      setCategorias(categorias.filter((categorias) => categorias.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    cargarCategorias()
  },[])

  return (
    <>
        <h1 className="text-5xl text-white font-bold text-center py-3">
        Categorías
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/CategoriaNueva" className="bg-indigo-500 px-2 py-1 rounded-md">
            Nueva Categoría
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/Administrador" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
        <div>
        <div className="columns-2 mt-4 flex">
        {categorias.map((categoria) => (
          <div
            className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 col-2 w-44"
            key={categoria.id}
            >
            <h2 className="text-xl font-bold text-white">{categoria.descripcion}</h2>
            <div className="flex gap-1 mt-5 justify-center">
              <button
                className="bg-red-500 px-2 py-1 text-white rounded-md"
                onClick={() => {
                  borrarCategoria(categoria.id);
                }}
              >
                Borrar
              </button>
              <button
                className="bg-slate-800 px-2 py-1 text-white rounded-md"
                onClick={() => navigate(`/CategoriaNueva/${categoria.id}`)}
                >
                Editar
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default CategoriaPescador;