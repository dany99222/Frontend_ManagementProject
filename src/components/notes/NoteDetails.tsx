import { useAuth } from "@/hooks/UseAuth";
import type { Note } from "@/types/index";
import { fromatDate } from "@/utils/utils";
import { useMemo } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {

  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deletNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetails({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(
    () => data?._id === note.createdBy._id,
    [data?._id, note.createdBy._id],
  );
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const taskId = queryParams.get("viewTask")!;
  const projectId = params.projectId!;

  const QueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      QueryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
  if (isLoading) return "Cargando...";

  return (
    <div className="p-3 justify-between items-center ">
      <div className="flex flex-col border border-slate-200 p-2 rounded shadow-md">
        <p>
          <CheckCircleIcon className="w-10 inline text-green-700 mr-1" />
          {note.content}.
        </p>
        <p className="font-bold text-sm md:text-base">
          Mensaje por: {note.createdBy.email}
        </p>
        <p className="text-xs text-slate-500">{fromatDate(note.createdAt)}</p>
        {canDelete && (
          <button
            type="button"
            className="p-2 w-full sm:w-32 font-bold text-red-600 hover:underline  uppercase text-xs rounded-md m-2"
            onClick={() => mutate({ projectId, taskId, noteId: note._id })}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
