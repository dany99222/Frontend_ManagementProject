import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { generateColor } from "@/utils/color";

export default function DashboardView() {

  // Estos 3 se utilizan y son fundamentales: UseQuery, useQueryClient, useMutation 

  // Hook para obtener proyectos
  const { data, isLoading } = useQuery({
    queryKey: ["projects"], // Identifica dee forma unica una consulta
    queryFn: getProjects, //funcion que se ejecuta para obetener datos
  });

  // Borrar la cache y se actualice nuestro state (no guarde anda en memoria)
  const queryClient = useQueryClient();

  // State para mdificar los datos
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
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
          <ul
            role="list"
            className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-10 border border-gray-100 bg-transparent shadow-lg p-6"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className={`flex justify-between gap-x-6 px-5 py-10 rounded-lg border border-gray-200 shadow-sm ${generateColor()}`}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-700 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-600">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Editar Proyecto
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => mutate(project._id)}
                          >
                            Eliminar Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No Existen Proyectos Creados {""}
            <Link
              className="text-green-700 text-xl font-bold"
              to={"/projects/create"}
            >
              Crear Proyecto
            </Link>
          </p>
        )}
      </>
    );
}
