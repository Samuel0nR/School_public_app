import { useState } from "react";
import { Link } from "react-router";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   //  <nav className="w-full bg-linear-to-r from-blue-700 via-blue-600 to-blue-900 text-white shadow-md">
    <nav className="w-full backdrop-blur-md bg-white/10 border-b border-white/20 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Nombre */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-blue-700 font-bold rounded-full w-9 h-9 flex items-center justify-center">
              CE
            </div>
            <span className="font-semibold text-lg tracking-wide">
              Comunidad Escolar
            </span>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-200 transition">Inicio</Link>
            <Link to="/News" className="hover:text-gray-200 transition">Noticias</Link>
            <Link to="#" className="hover:text-gray-200 transition">Eventos</Link>
            <Link to="#" className="hover:text-gray-200 transition">Comunidad</Link>

            {/* Botón */}
            <button className="bg-white text-blue-700 px-4 py-1.5 rounded-xl font-medium hover:bg-gray-200 transition">
              Ingresar
            </button>
          </div>

          {/* Botón Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-gray-200">Inicio</a>
            <a href="#" className="hover:text-gray-200">Noticias</a>
            <a href="#" className="hover:text-gray-200">Eventos</a>
            <a href="#" className="hover:text-gray-200">Comunidad</a>

            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg mt-2">
              Ingresar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
