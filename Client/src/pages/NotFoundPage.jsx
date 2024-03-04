import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <>
      <div>
        <h1 className="text-white text-5xl font-bold" >Dirección No Encontrada</h1>
        <button className="block py-2 rounded-xl text-white">
          <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
      </div>
    </>
  )
}

export default NotFoundPage;
