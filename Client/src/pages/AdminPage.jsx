import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <h1 className="text-5xl text-white font-bold text-center py-3">
        Administrador
      </h1>
      <div className=" grid-cols-2 flex justify-center">
        <div className="block">
          <Link
            to="/Torneos"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Torneos
          </Link>
          <Link
            to="/CategoriaPescador"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Categorías de Pescador
          </Link>
          <Link
            to="/Fiscales"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Fiscales
          </Link>
          <Link
            to="/Piezas/"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Piezas
          </Link>
          <Link
            to="/ClubPage/"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Clubes
          </Link>
          {/* <Link
            to="/"
            className="bg-indigo-500 mt-10 px-2 block text-center py-2 rounded-xl text-white max-w-3xl"
          >
            Volver
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
