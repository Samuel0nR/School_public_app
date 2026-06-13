import { useEffect } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface Props {
  isOpen:      boolean;
  type:        AlertType;
  title:       string;
  message?:    string;
  onClose:     () => void;
  autoClose?:  number; // ms, ej: 3000 para cerrar solo
}

const CONFIG: Record<AlertType, { icon: string; bg: string; border: string; iconBg: string; btn: string }> = {
  success: {
    icon:   "✓",
    bg:     "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100 text-green-600",
    btn:    "bg-green-600 hover:bg-green-700 text-white",
  },
  error: {
    icon:   "✕",
    bg:     "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100 text-red-600",
    btn:    "bg-red-600 hover:bg-red-700 text-white",
  },
  info: {
    icon:   "i",
    bg:     "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
    btn:    "bg-blue-600 hover:bg-blue-700 text-white",
  },
  warning: {
    icon:   "!",
    bg:     "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100 text-yellow-600",
    btn:    "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
};

export const AlertModal = ({ isOpen, type, title, message, onClose, autoClose }: Props) => {
  // Cierre automático opcional
  useEffect(() => {
    if (!isOpen || !autoClose) return;
    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [isOpen, autoClose, onClose]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const c = CONFIG[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className={`relative rounded-2xl shadow-2xl border p-6 w-full max-w-sm mx-4 animate-fadeIn ${c.bg} ${c.border}`}>
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <span className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${c.iconBg}`}>
            {c.icon}
          </span>
        </div>

        {/* Texto */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          {message && <p className="text-sm text-gray-500">{message}</p>}
        </div>

        {/* Botón */}
        <button
          onClick={onClose}
          className={`w-full py-2 rounded-xl font-medium transition ${c.btn}`}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};