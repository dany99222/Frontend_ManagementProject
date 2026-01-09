import { addUserToProject } from "@/api/TeamAPI";
import type { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  reset: ()=> void
};

export default function SearchResult({ user , reset }: SearchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset()
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };

    mutate(data)
  };

  return (
    <>
      <p className="mt-5 mb-5 text-center text-xl font-bold">Resultado: </p>
      <div className=" md:px-5 flex border md py-5 flex-col md:flex-row justify-between items-center">
        <p className="font-medium text-gray-800">{user.name}</p>
        <p className="font-medium text-gray-500">{user.email}</p>
        <button
          onClick={handleAddUserToProject}
          className="text-green-600 hover:bg-green-200 mt-5 md:mt-0  px-10 py-3 font-bold cursor-pointer"
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}
