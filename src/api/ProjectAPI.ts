import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  editProjectSchema,
  projectSchema,
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
    // accedemos a los datos y le pasamos el token de autorizacion
    // Nos trae solo los proyectos del usuario autenticado
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
    const response = editProjectSchema.safeParse(data);
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
export async function getFullProject(id: Project["_id"]) {
  if (!id) throw new Error("Project ID is required");

  try {
    const { data } = await api.get(`/projects/${id}`);

    // Mapear team strings a objetos con _id ficticio (o name si querés)
    const fixedData = {
      ...data,
      team: data.team.map((t:  Project["_id"]) => (typeof t === "string" ? { _id: t } : t)),
    };

    const response = projectSchema.safeParse(fixedData);
    if (!response.success) {
      
      throw new Error("Invalid project data from backend");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Unexpected error fetching project");
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};
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

// Borrar Proyecto
export async function deleteProject(id: Project["_id"]) {
  try {
    // Nos retorna un mensaje
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
