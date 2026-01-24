import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

export default function AddNoteForm() {
  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleAddNote = (formData: NoteFormData) =>{
console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleAddNote)} className="space-y-3 mt-3" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold"></label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border-gray-600 border rounded-sm"
          {...register("content", {
            required: "El contendio de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-green-600 hover:bg-green-700 transition-all text-white font-black cursor-pointer p-2 rounded w-full"
      />
    </form>
  );
}
