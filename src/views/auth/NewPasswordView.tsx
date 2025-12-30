import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-white">
        Reestablecer Password
      </h1>
      <p className="text-2xl font-light text-white m-5">
        Ingresa el coidigo que recibiste{""}
        <span className=" text-green-500 font-bold"> atravez de Email</span>
      </p>

      {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}  /> : <NewPasswordForm token={token} />}
    </>
  );
}
