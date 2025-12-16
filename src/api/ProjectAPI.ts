import api from "@/lib/axios";
import type { ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

// Consultas a la API 

//Crea un projecto
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
  throw new Error(error.response.data.error);
    }
  
  }
}
 
// Obetener todos los proyectos 
export async function getProjects() {
  try {
    // accedemos a los datos 
    const { data } = await api.get("/projects");
    console.log(data)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
  throw new Error(error.response.data.error);
    }
  
  }
}