type Props = {
  isLoading: boolean;
  message: string;
};

export const LoadingComponent = ({ isLoading, message }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm cursor-wait">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

      {message && (
        <p className="mt-4 text-lg font-semibold text-white">{message}</p>
      )}
    </div>
  );
};
