import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { NewsCard } from "../components/News_Card";
import { ModalPostNews } from "../components/Modal_Post_News";

import { getNews, postNews } from "../api/News.service";

export const News_wall = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadNews();
  }, []);

  const handleCreatePost = async (data: any) => {
    try {
      const req = await postNews(data);

      const newPost = {
        ...data,
        _id: req._id,
      };
      setPosts((prev) => {
        return [newPost, ...prev];
      });

      setIsOpen(false);

   } catch (error) {
      console.error("Error creando post", error);
    }
  };

  return (
    <section className="w-full max-w-4xl flex flex-col gap-6 my-5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex justify-between items-center">
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
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          console.log("Nuevo post:", data);
          handleCreatePost(data);
        }}
      />

      {/* Feed */}
      {loading ? (
        <div className="bg-white/80 text-center text-gray-500 rounded-2xl p-4">Cargando...</div>
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
          <p className="text-sm text-gray-400">Sé el primero en crear una 🚀</p>
        </div>
      )}
    </section>
  );
};
