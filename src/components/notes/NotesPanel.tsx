import type { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetails from "./NoteDetails";

type NotesPanelProps = {
  notes: Task["notes"];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <AddNoteForm />

      <div className=" mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 mt-5 ">Notas: </p>
            {notes.map((note) => (
              <NoteDetails key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className="text-gray-700 text-center pt-3">No Hay Notas</p>
        )}
      </div>
    </>
  );
}
