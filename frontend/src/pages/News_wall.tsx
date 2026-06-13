import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { NewsCard } from "../components/News_Card";
import { ModalPostNews } from "../components/Modal_Post_News";

import { getNews, postNews } from "../api/News.service";
import type { News, NewsRequest } from "../types/News";
import { useAlert } from "../Hooks/AlertHook";


export const News_wall = () => {
  const navigate = useNavigate();
  const [isOpen,  setIsOpen]  = useState(false);
  const [loading, setLoading] = useState(true);

  const [posts,   setPosts]   = useState<News[]>([]);
  const { success, error, AlertComponent } = useAlert();

  const loadNews = async () => {
    try {
      const data = await getNews();
      setPosts(data);

    } catch (error) {
      console.error("Error cargando noticias", error);

    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { loadNews(); }, []);
  
  type Request = Omit<NewsRequest, "_id">

  const handleCreatePost = async (data: Request) => {
    setLoading(true);
    try {
      const req = await postNews(data);
 
      // Post optimista con todos los campos correctos
      const newPost: News = {
        ...data,
        _id: req.id,
        created_at: new Date().toISOString(),
        expires_at: null,
      };
 
      // Fijados van al inicio, resto al inicio del resto
      setPosts((prev) =>
        data.fixed ? [newPost, ...prev] : [newPost, ...prev]
      );

      setIsOpen(false);
      success("¡Comunicado publicado!", "Ya aparece en el muro.", 3000);


    } catch (err) {
      console.error("Error creando post", err);
      error("Error al publicar", "Intenta nuevamente.");


    } finally {
      setLoading(false);
      
    }
  };

  return (
    <section className="w-full max-w-4xl flex flex-col gap-6 my-5">
      {AlertComponent}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex justify-between items-center sticky top-18 z-40">
        <h1 className="text-2xl font-bold text-gray-800">
          📰 Muro de Noticias
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Volver
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + Crear Post
          </button>
        </div>
      </div>

      {/* Modal */}
      <ModalPostNews
        isOpen={isOpen}
        isLoading={loading}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          handleCreatePost(data);
        }}
      />

      {/* Feed */}
      {loading ? (
        <div className="bg-white/80 text-center text-gray-500 rounded-2xl p-4">
          Cargando...
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-10 text-center">
          <p className="text-gray-500 text-lg mb-2">
            No hay publicaciones aún 😢
          </p>
          <p className="text-sm text-gray-400">Sé el primero en crear una!</p>
        </div>
      )}
    </section>
  );
};
