import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  type Project,
  type ProjectFormData,
} from "@/types/index";
import { isAxiosError } from "axios";

// Consultas a la API

//Crea un projecto
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Obetener todos los proyectos
export async function getProjects() {
  try {
    // accedemos a los datos
    const { data } = await api.get("/projects");

    //Mediante zod validamos que los datos que vienen de la api cumplen con los datos y la forma de nuestro Schema creado
    const response = dashboardProjectSchema.safeParse(data);

    // Si la respuesta es correcta retornamos los datos
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Obetener proyectos por su id
export async function getProjectById(id: Project["_id"]) {
  try {
    // accedemos a los datos
    const { data } = await api.get(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

// Actualizar proyecto
export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    // Enviamos los datos
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
  
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
