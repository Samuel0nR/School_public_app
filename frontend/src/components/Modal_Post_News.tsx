import type { News } from "../types/News";

type NewNews = Omit<News, "_id">;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewNews) => void;
}

export const ModalPostNews = ({ isOpen, onClose, onSubmit }: Props) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      autor_name: formData.get("autor_name") as string,
      title: formData.get("title") as string,
      comments: formData.get("comments") as string,
      created_at: new Date().toISOString(),
    };

    onSubmit(data);

    // limpiar
    // onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Comunicado</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-4"
        >
          {/* Autor */}
          <input
            type="text"
            placeholder="Autor"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="autor_name"
            required
          />

          {/* Título */}
          <input
            type="text"
            placeholder="Título"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            required
          />

          {/* Contenido */}
          <textarea
            placeholder="Escribe tu comunicado..."
            rows={4}
            minLength={10}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            name="comments"
            required
          />

          {/* Botones */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
