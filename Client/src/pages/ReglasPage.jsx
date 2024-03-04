import { useEffect } from "react";
import ReglasTarjetas from "../components/ReglasTarjetas";
import { useReglas } from "../context/ReglasProvider";
import { Link } from "react-router-dom";

function ReglasPage() {
  const { reglas, loadTareas } = useReglas();

  useEffect(() => {
    loadTareas();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 w-full">
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Reglas
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/nueva" className="bg-indigo-500 px-2 py-1 text-white w-20 rounded-md text-center">
            Nueva Regla
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 h-screen">
        {reglas.map((regla) => (
          <ReglasTarjetas regla={regla} key={regla.id} />
        ))}
      </div>
    </>
  );
}

export default ReglasPage;
