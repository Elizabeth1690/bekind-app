import type { Action } from '../types/action.types';

interface ActionsTableProps {
  actions: Action[];
  pagination: {
    pageNumber: number;  // 0-based (del API)
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
  onPageChange: (page: number) => void;  // Recibe página 0-based
}

export const ActionsTable: React.FC<ActionsTableProps> = ({
  actions,
  pagination,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Icono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Creación
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions.map((action) => (
            <tr key={action.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{action.name}</div>
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
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    action.status === 1
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {action.status === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate" title={action.description}>
                  {action.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(action.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(pagination.pageNumber - 1)}
            disabled={pagination.pageNumber === 0}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(pagination.pageNumber + 1)}
            disabled={pagination.pageNumber >= pagination.totalPages - 1}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando{' '}
              <span className="font-medium">{pagination.pageNumber * pagination.pageSize + 1}</span>{' '}
              -{' '}
              <span className="font-medium">
                {Math.min((pagination.pageNumber + 1) * pagination.pageSize, pagination.totalRecords)}
              </span>{' '}
              de <span className="font-medium">{pagination.totalRecords}</span> resultados
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onPageChange(pagination.pageNumber - 1)}
                disabled={pagination.pageNumber === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
              
              {/* Números de página: UI muestra 1-based, pero envía 0-based al hook */}
              {Array.from({ length: pagination.totalPages }, (_, i) => {
                const pageIndex = i;  // 0-based para el API
                const pageLabel = i + 1;  // 1-based para mostrar
                const isCurrentPage = pageIndex === pagination.pageNumber;
                
                return (
                  <button
                    key={pageIndex}
                    onClick={() => onPageChange(pageIndex)}  // ✅ Enviar índice 0-based
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      isCurrentPage
                        ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageLabel}  {/* ✅ Mostrar número 1-based */}
                  </button>
                );
              })}
              
              <button
                onClick={() => onPageChange(pagination.pageNumber + 1)}
                disabled={pagination.pageNumber >= pagination.totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente →
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
