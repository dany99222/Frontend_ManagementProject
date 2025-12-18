import { isAxiosError } from "axios";
import type { Project, TaskFormData } from "../types";
import api from "@/lib/axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
};
//Crea una tarea
export async function createProject({
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
