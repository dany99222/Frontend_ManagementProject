export default function AddNoteForm() {
  return (
    <form onSubmit={() => {}} className="space-y-3 mt-3" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold"></label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border-gray-600 border rounded-sm"
        />
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-green-600 hover:bg-green-700 transition-all text-white font-black cursor-pointer p-2 rounded w-full"
      />
    </form>
  );
}
