import { Link, useNavigate } from "react-router-dom";
import { borrarPiezaRequest, getPiezaRequest } from "../api/piezas.api";
import { useEffect, useState } from "react";

function PiezasPage() {
  const navigate = useNavigate();
  const [piezas, setPiezas] = useState([]);

  const cargarPieza = async () => {
    try {
      const resp = await getPiezaRequest();
      /* console.log(resp.data); */
      setPiezas(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarPiezas = async (id) => {
    try {
      const resp = await borrarPiezaRequest(id);
      setPiezas(piezas.filter((piezas) => piezas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPieza();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Piezas
        </h1>
        <div className="columns-2">
          <Link
            to="/PiezaNueva/"
            className="bg-indigo-500 px-2 block text-center py-2 rounded-xl text-white w-full"
          >
            Cargar Pieza
          </Link>
          <Link
            to="/MedidasPage/"
            className="bg-indigo-500 px-2 block text-center py-2 rounded-xl text-white w-full"
          >
            Cargar Medidas De Piezas
          </Link>
        </div>
        <button className="block text-center py-2 rounded-xl mt-4 text-white w-full">
          <Link to="/Administrador" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
        {/* tarjetas */}
        <div className="columns-2 mt-4 flex">
          {piezas != "" ? (
            piezas.map((pieza) => (
              <div
                className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4"
                key={pieza.id}
              >
                <h2 className="text-2xl font-bold text-white">
                  {pieza.descripcion}
                </h2>
                <h2 className="text-xl font-bold text-zinc-300">
                  {pieza.medida} CM
                </h2>
                <h2 className="text-xl font-bold text-zinc-300">
                  Puntaje:{pieza.puntaje}
                </h2>
                <div className="flex gap-1 mt-5 justify-center h-10">
                  <button
                    className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                    onClick={() => {
                      borrarPiezas(pieza.id);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="bg-slate-800 px-2 py-1 text-white rounded-md"
                    onClick={() => navigate(`/PiezaNueva/${pieza.id}`)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center align-middle h-full w-full">
              <h1 className="text-3xl text-white font-bold text-center py-3">
                No se encontraron piezas
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PiezasPage;
