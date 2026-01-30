import {  Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/UseAuth";

export default function AppLayout() {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  if (!data) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <header className="bg-gray-900 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center items-center">
          <NavMenu name={data.name} />
        </div>
      </header>

      <section className="max-w-screen-xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="dark"
      />
    </>
  );
}

