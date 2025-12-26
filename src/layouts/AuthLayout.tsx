
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-blue-950 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px] ">
          <h1 className="text-center text-white text-4xl md:text-5xl font-extrabold">Project Management</h1>
          <div className="my-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
