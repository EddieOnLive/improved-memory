import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClubesRequest } from "../api/clubes.api";
import { borrarClubesRequest } from "../api/clubes.api";
import { useNavigate } from "react-router-dom";

function ClubPage() {
  const navigate = useNavigate();
  const [clubes, setClubes] = useState([]);

  const cargarClubes = async () => {
    try {
      const resp = await getClubesRequest();
      setClubes(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarClub = async (id) => {
    try {
      const resp = await borrarClubesRequest(id);
      setClubes(clubes.filter((clubes) => clubes.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarClubes();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Clubes
        </h1>

        <Link
          to="/ClubForm/"
          className="bg-indigo-500 px-2 block text-center py-2 rounded-xl text-white w-full mb-2"
        >
          Nuevo Club
        </Link>
        <Link
          to="/Administrador/"
          className="bg-indigo-500 px-2 block text-center py-2 rounded-xl mb-2 text-white w-full"
        >
          Volver
        </Link>

        {/* Tarjeta de club */}
        <div className="columns-2 mt-4 flex">
        {clubes.map((club) => (
          <div
            className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 "
            key={club.id}
          >
            <h2 className="text-xl font-bold text-white">{club.descripcion}</h2>
            <p className="text-white hidden">{club.ubicacion}</p>
            <div className="flex gap-1 mt-5 justify-center h-10">
              <button
                className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                onClick={() => {
                  borrarClub(club.id);
                }}
              >
                Borrar
              </button>
              <button
                className="bg-slate-800 px-2 py-1 text-white rounded-md"
                onClick={() => navigate(`/ClubForm/${club.id}`)}
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

export default ClubPage;
