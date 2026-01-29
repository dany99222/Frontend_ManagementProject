import { Link } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Pagina No Encontrada 404
      </h1>
      <FaceFrownIcon className="text-yellow-500 w-32 my-0 mx-auto mt-5 " />
      <div className="text-center text-green-600 font-bold mt-10 ">
        <Link to="/" className="flex items-center justify-center gap-2 hover:text-green-700">
          <ArrowLeftIcon className="w-7" />
          <span>Volver a Proyectos</span>
        </Link>
      </div>
    </>
  );
}
