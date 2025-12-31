import React from 'react';
import type { Action } from '../types/action.types';

interface DetailsModalProps {
  isOpen: boolean;
  action: Action | null;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  action,
  onClose,
}) => {
  if (!isOpen || !action) return null;

  const daysSinceCreation = Math.floor(
    (new Date().getTime() - new Date(action.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: 'Archivo, system-ui, -apple-system, sans-serif' }}
      >
        {/* Header limpio */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {action.icon && (
                <img 
                  src={action.icon} 
                  alt={action.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-[#28272A] mb-1">
                  {action.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded ${
                    action.status === 1
                      ? 'text-[#0B8A00] bg-[#D2E5D0]'
                      : 'text-gray-700 bg-gray-100'
                  }`}>
                    {action.status === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    ID: {action.id}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Descripción completa */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                📝 Descripción completa
              </label>
              <span className="text-xs text-gray-500">
                {action.description.length} caracteres
              </span>
            </div>
            <p className="text-gray-900 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
              {action.description}
            </p>
          </div>

          {/* Grid de información - LIMPIO */}
          <div className="grid grid-cols-2 gap-4">
            {/* Fecha completa */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                📅 Fecha de creación
              </label>
              <p className="text-sm font-medium text-gray-900">
                {new Date(action.createdAt).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(action.createdAt).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Hace {daysSinceCreation} {daysSinceCreation === 1 ? 'día' : 'días'}
              </p>
            </div>

            {/* Color */}
            {action.color && (
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  🎨 Color asignado
                </label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-300 shadow-sm"
                    style={{ backgroundColor: action.color }}
                  />
                  <div>
                    <p className="text-sm font-mono font-semibold text-gray-900">
                      {action.color.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Hexadecimal
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Información del ícono - LIMPIO */}
          {action.icon && (
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                🖼️ Información del ícono
              </label>
              <div className="flex items-start gap-4">
                <img 
                  src={action.icon} 
                  alt={action.name}
                  className="w-24 h-24 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">URL del archivo:</p>
                    <p className="text-xs font-mono text-gray-700 break-all bg-gray-50 px-3 py-2 rounded border border-gray-200">
                      {action.icon}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información técnica - LIMPIO */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
              ⚙️ Información técnica
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-gray-500 mb-1">ID de registro</p>
                <p className="font-mono font-semibold text-gray-900">{action.id}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-gray-500 mb-1">Estado numérico</p>
                <p className="font-mono font-semibold text-gray-900">{action.status}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-gray-500 mb-1">Longitud del nombre</p>
                <p className="font-mono font-semibold text-gray-900">{action.name.length} caracteres</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-gray-500 mb-1">Timestamp</p>
                <p className="font-mono font-semibold text-gray-900 text-[10px]">
                  {new Date(action.createdAt).getTime()}
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas - LIMPIO */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
              📊 Estadísticas de uso (demo)
            </label>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">Veces usada</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{daysSinceCreation}</p>
                <p className="text-xs text-gray-500 mt-1">Días activa</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">Referencias</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer limpio */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Última actualización: {new Date(action.createdAt).toLocaleDateString('es-ES')}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#1a1f4e] text-white rounded-lg hover:bg-[#252a5e] transition-colors font-medium text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
