import { getProjectById } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import EditProjectForm from "./EditProjectForm";

export default function EditProjectView() {
  //  Podemos leer parametros de la url
  const params = useParams();
  //Accedemos al id que mandamos a la url
  const projectId = params.projectId!;

  // Hook para obtener proyectos por id
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId], // Identifica dee forma unica una consulta
    queryFn: () => getProjectById(projectId), //funcion que se ejecuta para obetener datos
    retry: false, //Lo intenta una vez y cierra conexion
  });

  console.log(data);
  console.log(isLoading);
  console.log(isError);

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditProjectForm />;
}
