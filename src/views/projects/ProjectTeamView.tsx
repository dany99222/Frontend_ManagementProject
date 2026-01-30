import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import type { TeamMember } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery<TeamMember[]>({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
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

        <h2 className="text-3xl text-gray-600 font-black my-10">
          Miembros actuales
        </h2>
        {data.length ? (
          <ul
            role="list"
            className="
    grid
    gap-6
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    mt-10
    p-4
  "
          >
            {data?.map((member) => (
              <li
                key={member._id}
                className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-shadow
        p-5
        flex flex-col justify-between
        min-w-[200px]
      "
              >
                <div className="mb-4">
                  <p className="text-xl font-bold text-blue-700 truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-blue-400 truncate">
                    {member.email}
                  </p>
                </div>

                <button
                  type="button"
                  className="
          mt-auto
          w-full
          px-4 py-2
          text-sm font-semibold
          text-white
          bg-red-500
          hover:bg-red-600
          rounded-lg
          transition-colors
        "
                  onClick={() => mutate({ projectId, userId: member._id })}
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
