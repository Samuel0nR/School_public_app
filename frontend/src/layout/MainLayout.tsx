import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex justify-center items-center px-4">
        <Outlet />
      </main>
    </section>
  );
};
