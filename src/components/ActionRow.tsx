import React from 'react';
import type { Action } from '../types/action.types';

interface ActionRowProps {
  action: Action;
}

export const ActionRow: React.FC<ActionRowProps> = ({ action }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">{action.name}</span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        {action.icon ? (
          <img 
            src={action.icon} 
            alt={action.name} 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
            N/A
          </div>
        )}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            action.status === 1
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {action.status === 1 ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{action.description}</span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-600">{formatDate(action.createdAt)}</span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <button 
            className="text-gray-600 hover:text-primary transition-colors"
            title="Editar"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button 
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Eliminar"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <button 
            className="text-gray-600 hover:text-primary transition-colors"
            title="Ver detalle"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};
