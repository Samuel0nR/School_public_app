import type { NewsRequest, TipoComunicado } from "../types/News";

import { LoadingComponent } from "./Loading_Component";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: NewsRequest) => void;
}

export const ModalPostNews = ({ isOpen, isLoading, onClose, onSubmit }: Props) => {
  // const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      autor_name: formData.get("autor_name") as string,
      title: formData.get("title") as string,
      comments: formData.get("comments") as string,
      type: formData.get("type") as TipoComunicado,
      fixed: formData.get("fijado") === "on" ? true : false,
    };

    try {
      onSubmit(data);

    } catch(error) {
      console.error("Ha ocurrido un error al crear el Post ", error);
      
    } finally {

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <LoadingComponent isLoading={isLoading} message="Creando Post..." />
 
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
 
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Comunicado</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
        </div>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text" name="autor_name" placeholder="Autor"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
 
          <select name="type" defaultValue="none"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none" disabled>Tipo de comunicado</option>
            <option value="INFO">Informativo</option>
            <option value="URGENT">Urgente</option>
            <option value="EVENT">Evento</option>
          </select>
 
          <input
            type="text" name="title" placeholder="Título"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
 
          <textarea
            name="comments" placeholder="Escribe tu comunicado..."
            rows={4} minLength={10} required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
 
          {/* Fijado */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" name="fijado" className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-700">📌 Fijar comunicado (no expira)</span>
          </label>
 
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button type="submit"
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