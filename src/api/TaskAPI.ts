import { isAxiosError } from "axios";
import type { Project, Task, TaskFormData } from "../types";
import api from "@/lib/axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task['_id']
};
//Crea una tarea
export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPI, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Traer tarea por id
export async function getTaskById({projectId, taskId}: Pick<TaskAPI, "taskId" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
