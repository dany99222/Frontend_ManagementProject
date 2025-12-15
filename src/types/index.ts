import { z } from "zod";

// Projects Schemas
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchema>; //Type paraa datos que vienen del backend
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'> // Type Datos que se mandan del formulario