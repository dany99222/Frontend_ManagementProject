import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectAPI";

export default function DashboardView() {
  // Hook para obtener proyectos
  const { data, isLoading } = useQuery({
    queryKey: ["projects"], // Identifica dee forma unica una consulta
    queryFn: getProjects, //funcion que se ejecuta para obetener datos
  });

  if (isLoading) return "cargando...";

  // Si existe data, se renderiza el componente
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis Proyectos </h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Administra Tus Proyectos
        </p>
        <nav className="my-5">
          <Link
            className="bg-green-500 hover:bg-green-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/projects/create"}
          >
            Nuevo Proyecto
          </Link>
        </nav>

        {data.length ? (
          <p>Si hay</p>
        ) : (
          <p className="text-center py-20">
            No Existen Proyectos Creados {""}
            <Link className="text-green-700 text-xl font-bold" to={"/projects/create"}>
              Crear Proyecto
            </Link>
          </p>
        )}
      </>
    );
}
