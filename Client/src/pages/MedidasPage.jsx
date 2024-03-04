import { Link, useNavigate } from "react-router-dom";
import { borrarMedidasRequest, getMedidasRequest } from "../api/medidas.api";
import { useEffect, useState } from "react";

function MedidasPage() {
  const navigate = useNavigate();
  const [medidas, setMedidas] = useState([]);

  const cargarMedidas = async () => {
    try {
      const resp = await getMedidasRequest();
      setMedidas(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarMedidas = async (id) => {
    try {
      const resp = await borrarMedidasRequest(id);
      setMedidas(medidas.filter((medidas) => medidas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarMedidas();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Medidas Registradas
        </h1>
        <div>
          <Link
            to="/MedidasForm/"
            className="bg-indigo-500 px-2 block text-center py-2 rounded-xl text-white w-full"
          >
            Cargar Medidas De Piezas
          </Link>
        </div>
        <button className="block text-center py-2 rounded-xl mt-4 text-white w-full">
          <Link to="/Piezas" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
        {/* tarjetas */}
        <div className="columns-2 mt-4 flex">
          {medidas.map((medida) => (
            <div
              className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4"
              key={medida.id}
            >
              <h2 className="text-xl font-bold text-white">
                {medida.medida} CM
              </h2>
              <div className="flex gap-1 mt-5 justify-center h-10">
                <button
                  className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                  onClick={() => {
                    borrarMedidas(medida.id);
                  }}
                >
                  Borrar
                </button>
                <button
                  className="bg-slate-800 px-2 py-1 text-white rounded-md"
                  onClick={() => navigate(`/MedidasForm/${medida.id}`)}
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

export default MedidasPage;
