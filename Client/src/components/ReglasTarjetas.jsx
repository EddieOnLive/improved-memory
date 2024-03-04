import { useReglas } from "../context/ReglasProvider";
import { useNavigate } from "react-router-dom";

function ReglasTarjetas({ regla }) {
  const { borrarReglas } = useReglas();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4">
      <h2 className="text-xl font-bold text-white">{regla.articulo}</h2>
      <p className="text-white">{regla.descripcion}</p>
      <div className="flex gap-1 mt-20 justify-center">
        <button
          className="bg-red-500 px-2 py-1 text-white rounded-md"
          onClick={() => {
            borrarReglas(regla.id);
          }}
        >
          Borrar
        </button>
        <button
          className="bg-slate-800 px-2 py-1 text-white rounded-md"
          onClick={() => navigate(`/editar/${regla.id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default ReglasTarjetas;
