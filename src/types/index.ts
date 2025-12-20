import { z } from "zod";
// TASKS
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underRiview",
  "completed",
]); 
// Type de projects 
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> //datos que se mandaran del form


// ---------------------------------------------------------------
// PROJECTS
// Projects Schemas
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchema>; //Type paraa datos que vienen del backend
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>; // Type Datos que se mandan del formulario

// Schema de proyectos que nos llegan de la api
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);
