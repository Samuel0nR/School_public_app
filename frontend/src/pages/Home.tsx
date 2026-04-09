import { useNavigate } from "react-router";


export const Home = () => {
  const navigate = useNavigate();

  return (
    <article className="w-full max-w-4xl">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenida a la Comunidad Escolar 👋
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Un espacio digital para compartir información importante con toda la
          comunidad educativa.
        </p>

        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>

        <div className="text-gray-700 space-y-3 mb-8">
          <p>
            Aquí podrás publicar comunicados relevantes para estudiantes,
            docentes y apoderados.
          </p>
          <p>
            Recuerda mantener siempre un lenguaje respetuoso y adecuado, ya que
            esta es una plataforma educativa.
          </p>
          <p className="text-sm text-gray-500">
            ⏳ Los comunicados estarán disponibles durante 1 hora desde su
            publicación.
          </p>
        </div>

        <button
          onClick={() => navigate("/News")}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-medium px-6 py-3 rounded-xl shadow-md transition duration-300"
        >
          Ir al Muro de Noticias →
        </button>
      </div>
    </article>
  );
};
