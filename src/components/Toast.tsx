import React, { useEffect } from 'react';
import type { ToastType } from '../hooks/useToast';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`}>
      <span className="text-xl font-bold">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-white hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{ 
  toasts: Array<{ id: string; message: string; type: ToastType }>; 
  onRemove: (id: string) => void 
}> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
