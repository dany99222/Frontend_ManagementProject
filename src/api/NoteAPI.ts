import { isAxiosError } from "axios";
import type { NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteApPIType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteApPIType, 'projectId' | 'taskId' | 'formData'>) {
  try {
const url = `/projects/${projectId}/tasks/${taskId}/notes`
const {data} = await api.post<string>(url,formData)

return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }}