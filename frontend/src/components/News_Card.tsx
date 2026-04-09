import type { News } from "../types/News";

interface Props {
  post: News;
}

export const NewsCard = ({ post }: Props) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-2xl hover:shadow-xl transition flex flex-col h-full">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {post.title}
        </h3>

        {/* Badge */}
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full border whitespace-nowrap">
          Comunicado
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-4 flex-1">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
          {post.comments}
        </p>
      </div>

      {/* SEPARATOR */}
      <div className="w-32 h-0.5 bg-gray-400 mx-auto my-5 rounded-full"></div>

      {/* FOOTER */}
      <div className="text-center mt-auto">
        <h2 className="font-semibold text-gray-800">{post.autor_name}</h2>
        <span className="text-xs text-gray-500">
          {formatDate(post.created_at)}
        </span>
      </div>
    </article>
  );
};
