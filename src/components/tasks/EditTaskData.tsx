import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  //Conseguimos el id del projecto
  const params = useParams();
  const projectId = params.projectId!;

  //Para leer el queryString
  const location = useLocation();
  //extraer
  const queryParams = new URLSearchParams(location.search);
  //obtenemos editTask
  const taskId = queryParams.get("editTask")!;

  //   Mandamos los datos a task API para la consulta
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, // si taskId tiene algun valor resuelve true
  });
  if(isError) return <Navigate to={'/404'} />

  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
