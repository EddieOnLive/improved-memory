import { useNavigate, Link } from "react-router-dom";
import { borrarModalidadesRequest, getModalidadesRequest } from "../api/modalidades.api";
import { useEffect, useState } from "react";

function ModalidadesPage() {
  const navigate = useNavigate();
  const [modalidades, setModalidades] = useState([]);

  const cargarModalidades = async () => {
    try {
      const resp = await getModalidadesRequest();
      setModalidades(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarModalidades = async (id) => {
    try {
      const resp = await borrarModalidadesRequest(id);
      setModalidades(modalidades.filter((modalidades) => modalidades.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    cargarModalidades()
  },[])

  return (
    <>
        <h1 className="text-5xl text-white font-bold text-center py-3">
        Modalidades
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/ModalidadesForm" className="bg-indigo-500 px-2 py-1 rounded-md">
            Cargar Modalidad
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/Torneos" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
        <div>
        <div className="columns-2 mt-4 flex">
        {modalidades.map((modalidad) => (
          <div
            className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 col-2 w-44"
            key={modalidad.id}
            >
            <h2 className="text-xl font-bold text-white">{modalidad.descripcion}</h2>
            <div className="flex gap-1 mt-5 justify-center">
              <button
                className="bg-red-500 px-2 py-1 text-white rounded-md"
                onClick={() => {
                  borrarModalidades(modalidad.id);
                }}
              >
                Borrar
              </button>
              <button
                className="bg-slate-800 px-2 py-1 text-white rounded-md"
                onClick={() => navigate(`/ModalidadesForm/${modalidad.id}`)}
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

export default ModalidadesPage;