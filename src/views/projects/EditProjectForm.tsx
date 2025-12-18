import ProjectForm from "@/components/projects/ProjectForm";
import type { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFromProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};
export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFromProps) {
  // Importamos use navigate
  const navigate = useNavigate();

  // Los valorees inciiales son en base a el data que pasamos mediante props
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  //Elimina los datos en cache
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      //Elimina los datos en cache de este querykey y vuelve  hacer la consulta al backend
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });

      navigate("/");
      toast.success(data);
    },
  });

  //   Se encarga del form y las diferentes acciones
  const {
    register, //Registra cada input
    handleSubmit, //Se procesa para la validacion
    formState: { errors }, //Ahi estan los errores de validacion
  } = useForm({ defaultValues: initialValues });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };

    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto </h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Formulario Para Crear Proyecto
        </p>
        <nav className="my-5">
          <Link
            className="bg-green-600 hover:bg-green-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/"}
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate // desabilita validacion html
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
          />
        </form>
      </div>
    </>
  );
}
