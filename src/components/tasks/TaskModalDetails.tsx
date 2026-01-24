import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { fromatDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";
import type { TaskStatus } from "@/types/index";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
  //Leemos el id del projecto
  const params = useParams();
  const projectId = params.projectId!;

  //Para redireccionar al usuario y eliminar datos de consulta
  const navigate = useNavigate();

  // Leer el valor que ingresamos en la url de TaskCard de "ver tarea"
  const location = useLocation();
  //obtener el valor de view task
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  //Si taskId tiene algo mostramos el modal en caso contrario no
  const show = taskId ? true : false;

  //   consulta a la base de datos para mostrar los datos de la tarea
  //todas las useQuery usan query key
  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, //se ejecuta solo si TaskId existe
    retry: false, //solo hace una consulta y ya
  });

  // Para invalidar la cache de las consultas
  const queryClient = useQueryClient();

  //   Envia la actualizacion de estado a la bd
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  //   Toma los parametros del select y agrupa taskid y projectid
  const hanldeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;

    const data = {
      projectId,
      taskId,
      status,
    };

    mutate(data);
  };

  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
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
                    <p className="text-sm text-slate-400">
                      Agregada el: {fromatDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {fromatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-blue-500 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-600 mb-2">
                      {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>

                      <select
                        className="w-full p-3 text-white bg-gray-800 border-gray-600 shadow-lg"
                        defaultValue={data.status}
                        onChange={hanldeChange}
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    {data.completedBy.length ? (
                      <>
                        <p className="text-xl font-bold pb-2">
                          Historial de cambios
                        </p>
                        <ul className="border px-4 py-2 rounded shadow-lg ">
                          {[...data.completedBy]
                            .reverse()
                            .map((activityLog) => (
                              <li
                                key={activityLog._id}
                                className="text-sm text-gray-700 italic"
                              >
                                <span className="font-semibold not-italic">
                                  {statusTranslations[activityLog.status]}{" "}
                                  {"→ "}
                                </span>
                                {activityLog.user.name}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : null}

                    <NotesPanel />
                    
                  </Dialog.Panel>

                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
