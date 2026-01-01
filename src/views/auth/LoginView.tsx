import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { autenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: autenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Iniciando Sesion');
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-white">
        Iniciar Sesion
      </h1>
      <p className="text-2xl font-light text-white m-5">
        Comienza{""}
        <span className=" text-green-500 font-bold"> Ahora</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-md shadow-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-black hover:bg-zinc-900 uppercase rounded-md w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 font-medium"
        >
          No tienes cuenta? Crea una
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 font-medium"
        >
          Olvidaste tu Password? Restablecer
        </Link>
      </nav>
    </>
  );
}
