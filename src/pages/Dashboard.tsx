import { useActions } from '../hooks/useActions';
import { ActionsTable } from '../components/ActionsTable';
import { Loader } from '../components/Loader';

export const DashboardPage: React.FC = () => {
  const { actions, pagination, isLoading, error, goToPage } = useActions();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Ocurrió un error inesperado
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
            <p className="text-gray-600">Gestión de Bakanes / Bakanes</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            + Crear tipo de categoría
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : actions.length > 0 ? (
          <ActionsTable
            actions={actions}
            pagination={pagination}
            onPageChange={goToPage}
          />
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No hay acciones disponibles</p>
          </div>
        )}
      </main>
    </div>
  );
};
