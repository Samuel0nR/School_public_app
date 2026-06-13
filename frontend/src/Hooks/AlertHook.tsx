import { useState, useCallback } from "react";
import { AlertModal } from "../shared/components/AlertModal";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertState {
  type:     AlertType;
  title:    string;
  message?: string;
  autoClose?: number;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = useCallback((params: AlertState) => {
    setAlert(params);
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  // Shortcuts para no escribir type cada vez
  const success = useCallback((title: string, message?: string, autoClose?: number) =>
    setAlert({ type: "success", title, message, autoClose }), []);

  const error = useCallback((title: string, message?: string) =>
    setAlert({ type: "error", title, message }), []);

  const info = useCallback((title: string, message?: string, autoClose?: number) =>
    setAlert({ type: "info", title, message, autoClose }), []);

  const warning = useCallback((title: string, message?: string) =>
    setAlert({ type: "warning", title, message }), []);

  // El componente listo para poner en el JSX
  const AlertComponent = (
    <AlertModal
      isOpen={!!alert}
      type={alert?.type ?? "info"}
      title={alert?.title ?? ""}
      message={alert?.message}
      autoClose={alert?.autoClose}
      onClose={hideAlert}
    />
  );

  return { showAlert, hideAlert, success, error, info, warning, AlertComponent };
};