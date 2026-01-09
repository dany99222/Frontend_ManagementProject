import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getProjectTeam } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Administra Equipo</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Adminstra Equipo de Trabajo
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Agregar Colaborador
          </button>

          <Link
            className="bg-blue-600 hover:bg-blue-700 px-10 py-3 text-gray-100 text-xl font-bold cursor-pointer transition-colors rounded-md"
            to={`/projects/${projectId}`}
          >
            Volver a proyecto
          </Link>
        </nav>

        <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data?.map((member) => (
              <li
                key={member._id}
                className="bg-green-50 flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-blue-600">
                      {member.name}
                    </p>
                    <p className="text-sm text-blue-400">{member.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="transition-colors block px-3 text-sm font-bold leading-6 text-red-500 hover:bg-red-500 hover:text-white rounded "
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

        <AddMemberModal />
      </>
    );
}
