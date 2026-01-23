import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";

import EditTaskData from "@/components/tasks/EditTaskData";
import { TaskList } from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/UseAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailView() {
  const { data: user, isLoading: authLoading } = useAuth();

  //En este caso nos sirve para poner informacion en la url
  const navigate = useNavigate();

  //  Podemos leer parametros de la url
  const params = useParams();
  //Accedemos al id que mandamos a la url
  const projectId = params.projectId!;

  // Hook para obtener proyectos por id
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId], // Identifica dee forma unica una consulta
    queryFn: () => getProjectById(projectId), //funcion que se ejecuta para obetener datos
    retry: false, //Lo intenta una vez y cierra conexion
  });

  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
          {!isManager(data.manager, user._id) ? (
            <p className="bg-red-900 w-56 text-sm p-2 text-center rounded my-2 text-white">
              Eres miembro de este equipo
            </p>
          ) :  <p className="bg-blue-900 w-56 text-sm p-2 text-center rounded my-2 text-white">
              Eres Manager de este equipo
            </p>}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>

            <Link
              className="bg-blue-600 hover:bg-blue-700 px-10 py-3 text-gray-100 text-xl font-bold cursor-pointer transition-colors rounded-md"
              to={"team"}
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
