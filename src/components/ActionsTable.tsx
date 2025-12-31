import React from 'react';
import type { Action } from '../types/action.types';
import SortIcon from '../assets/icons/titulo-tablas.svg';
import EditIcon from '../assets/icons/editar.svg';
import DeleteIcon from '../assets/icons/eliminar.svg';
import MoreIcon from '../assets/icons/ver.svg';

interface ActionsTableProps {
  actions: Action[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onDelete?: (action: Action) => void;
  onViewDetails?: (action: Action) => void;
}

export const ActionsTable: React.FC<ActionsTableProps> = ({
  actions,
  pagination,
  onPageChange,
  onPageSizeChange,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow mx-12">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left border-r border-gray-200" style={{ width: '180px' }}>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold text-[#656268] leading-tight" 
                    style={{ fontSize: '14px', lineHeight: '18px', display: 'inline-block', maxWidth: '130px' }}
                  >
                    Nombre de la categoría
                  </span>
                  <img src={SortIcon} alt="Ordenar" className="w-4 h-4 flex-shrink-0" />
                </div>
              </th>

              <th className="px-6 py-3 text-center border-r border-gray-200" style={{ width: '150px' }}>
                <div className="flex items-center justify-center gap-2">
                  <span 
                    className="text-sm font-bold text-[#656268] leading-tight" 
                    style={{ fontSize: '14px', lineHeight: '18px', display: 'inline-block', maxWidth: '100px' }}
                  >
                    Icono de la categoría
                  </span>
                  <img src={SortIcon} alt="Ordenar" className="w-4 h-4 flex-shrink-0" />
                </div>
              </th>

              <th className="px-6 py-3 text-left border-r border-gray-200" style={{ width: '130px' }}>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold text-[#656268] whitespace-nowrap" 
                    style={{ fontSize: '14px', lineHeight: '20px' }}
                  >
                    Estado
                  </span>
                  <img src={SortIcon} alt="Ordenar" className="w-4 h-4 flex-shrink-0" />
                </div>
              </th>

              <th className="px-6 py-3 text-left border-r border-gray-200" style={{ width: '200px' }}>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold text-[#656268] whitespace-nowrap" 
                    style={{ fontSize: '14px', lineHeight: '20px' }}
                  >
                    Descripción
                  </span>
                  <img src={SortIcon} alt="Ordenar" className="w-4 h-4 flex-shrink-0" />
                </div>
              </th>

              <th className="px-6 py-3 text-left border-r border-gray-200" style={{ width: '140px' }}>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold text-[#656268] leading-tight" 
                    style={{ fontSize: '14px', lineHeight: '18px', display: 'inline-block', maxWidth: '90px' }}
                  >
                    Fecha de creación
                  </span>
                  <img src={SortIcon} alt="Ordenar" className="w-4 h-4 flex-shrink-0" />
                </div>
              </th>

              <th className="px-6 py-3 text-left" style={{ width: '120px' }}>
                <span 
                  className="text-sm font-bold text-[#656268] whitespace-nowrap" 
                  style={{ fontSize: '14px', lineHeight: '20px' }}
                >
                  Acciones
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {actions.map((action) => (
              <tr key={action.id} className="hover:bg-gray-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {action.icon ? (
                      <img
                        src={action.icon}
                        alt={action.name}
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-pink-200 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600 text-base">📷</span>
                      </div>
                    )}
                    <span 
                      className="text-[#28272A]" 
                      style={{ 
                        fontSize: '14px', 
                        lineHeight: '20px', 
                        fontWeight: 400,
                        fontFamily: 'Archivo, system-ui, -apple-system, sans-serif'
                      }}
                    >
                      {action.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center items-center">
                    {action.icon ? (
                      <img
                        src={action.icon}
                        alt=""
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-sm">—</span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1.5 inline-flex text-sm font-medium rounded items-center justify-center ${
                      action.status === 1
                        ? 'text-[#0B8A00] bg-[#D2E5D0]'
                        : 'text-gray-700 bg-gray-100'
                    }`}
                    style={{ 
                      fontSize: '14px', 
                      lineHeight: '20px',
                      border: action.status === 1 ? '1px solid #D2E5D0' : '1px solid #E5E7EB'
                    }}
                  >
                    {action.status === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div 
                    className="text-[#28272A] truncate" 
                    style={{ 
                      fontSize: '14px', 
                      lineHeight: '20px', 
                      fontWeight: 400,
                      fontFamily: 'Archivo, system-ui, -apple-system, sans-serif',
                      maxWidth: '200px'
                    }}
                    title={action.description}
                  >
                    {action.description}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span 
                    className="text-[#28272A] whitespace-nowrap"
                    style={{ 
                      fontSize: '14px', 
                      lineHeight: '20px', 
                      fontWeight: 400,
                      fontFamily: 'Archivo, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    {new Date(action.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Editar"
                    >
                      <img src={EditIcon} alt="Editar" className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => onDelete?.(action)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <img src={DeleteIcon} alt="Eliminar" className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => onViewDetails?.(action)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Ver detalles"
                    >
                      <img src={MoreIcon} alt="Ver detalles" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Resultados por página</span>
            <select
              value={pagination.pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              {pagination.pageNumber * pagination.pageSize + 1} - {Math.min((pagination.pageNumber + 1) * pagination.pageSize, pagination.totalRecords)} de {pagination.totalRecords}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(0)}
              disabled={pagination.pageNumber === 0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Primera página"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => onPageChange(pagination.pageNumber - 1)}
              disabled={pagination.pageNumber === 0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Anterior"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => onPageChange(pagination.pageNumber + 1)}
              disabled={pagination.pageNumber >= pagination.totalPages - 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Siguiente"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => onPageChange(pagination.totalPages - 1)}
              disabled={pagination.pageNumber >= pagination.totalPages - 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Última página"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
