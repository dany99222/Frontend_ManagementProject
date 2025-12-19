import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import type { TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  //Para navegar entre paginas
  const navigate = useNavigate();

  // Leer si un modal existe
  // se usa para leeer datos de la url (todo)
  const location = useLocation();
  //URLSearchParams: convierte ese string en algo facil de leer
  //(location.search:es la parte de la url que viene despues de ?
  const queryParams = new URLSearchParams(location.search);
  // queryParams.get: revisa si el parametro esta en la url
  const modalTask = queryParams.get("newTask");
  //Si existe valor, true. Si no existe, false
  const show = modalTask ? true : false;

  // Obtener projectId de la url
  const params = useParams();
  const projectId = params.projectId!;

  //Valores iniciales del hook form
  const initialvalues: TaskFormData = {
    name: "",
    description: "",
  };

  //   hook de use form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialvalues });

  //Para que no se guarden en memoria las consultas y realicen otra
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      reset(); //resetea el formulario y lo inicia
      navigate(location.pathname, { replace: true }); // cierra el modal y nos lleva a la pagina de tasks
    },
  });

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    };

    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          //navega a la misma ruta y quita el query params que puse
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-blue-900  my-5"
                  >
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold text-gray-500">
                    Llena el formulario y crea {""}
                    <span className="">una tarea</span>
                  </p>

                  <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg flex flex-col gap-5"
                    noValidate // desabilita validacion html
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <TaskForm register={register} errors={errors} />
                    <input
                      type="submit"
                      value="Guardar"
                      className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg text-sm md:text-lg"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
