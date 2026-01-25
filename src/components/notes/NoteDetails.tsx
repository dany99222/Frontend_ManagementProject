import type { Note } from "@/types/index";
import { fromatDate } from "@/utils/utils";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetails({ note }: NoteDetailProps) {
  return (
    <div className="p-3 justify-between items-center">
      <div>
        <p>
          {note.content}. Dice:{" "}
          <span className="font-bold"> {note.createdBy.email}</span>
        </p>
        <p className="text-xs text-slate-500">{fromatDate(note.createdAt)}</p>
      </div>
    </div>
  );
}
