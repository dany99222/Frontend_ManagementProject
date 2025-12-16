import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

export default function CreateProjectView() {

  const navigate = useNavigate(); // para redireccionar al usuario una vez creado el proyecto

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register, //Registra cada input
    handleSubmit, //Se procesa para la validacion
    formState: { errors }, //Ahi estan los errores de validacion
  } = useForm({ defaultValues: initialValues });

  const handleForm = async (formData: ProjectFormData) => {
    // Interacionn a la api
    const data = await createProject(formData);
    // Si es correcto se activa una notoficacion
    toast.success(data)
    //Nos retorna hacia el inicio
    navigate('/')
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto </h1>
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
            className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
          />
        </form>
      </div>
    </>
  );
}
