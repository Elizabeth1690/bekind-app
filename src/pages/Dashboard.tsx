import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { ActionsTable } from '../components/ActionsTable';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { CreateActionForm } from '../components/CreateActionForm';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { DetailsModal } from '../components/DetailsModal';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import FiltroIcon from '../assets/icons/filtro.svg';
import type { CreateActionPayload, Action } from '../types/action.types';

export const DashboardPage: React.FC = () => {
  const { 
    actions, 
    pagination, 
    isLoading, 
    error, 
    goToPage, 
    changePageSize,
    createAction,
    deleteAction
  } = useActions();
  
  const [activeTab, setActiveTab] = useState('categorias');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionToDelete, setActionToDelete] = useState<Action | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedActionDetails, setSelectedActionDetails] = useState<Action | null>(null);
  
  const [filters, setFilters] = useState({
    searchText: '',
    status: 'all',
    sortBy: 'recent',
  });
  
  const { toasts, showToast, removeToast } = useToast();

  const tabs = [
    { id: 'categorias', label: 'Categorías' },
    { id: 'tipos', label: 'Tipos' },
    { id: 'evidencias', label: 'Evidencias' },
  ];

  const handleCreateAction = async (data: CreateActionPayload, file?: File) => {
    try {
      await createAction(data, file);
      setIsModalOpen(false);
      showToast('¡Categoría creada exitosamente!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Error al crear la categoría', 'error');
      throw error;
    }
  };

  const openDeleteModal = (action: Action) => {
    setActionToDelete(action);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!actionToDelete) return;
    
    setIsDeleting(true);
    
    try {
      await deleteAction(actionToDelete.id);
      setIsDeleteModalOpen(false);
      setActionToDelete(null);
      showToast('Categoría eliminada correctamente', 'success');
    } catch (error: any) {
      showToast(error.message || 'Error al eliminar la categoría', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setActionToDelete(null);
  };

  const handleViewDetails = (action: Action) => {
    setSelectedActionDetails(action);
    setIsDetailsModalOpen(true);
  };

  const filteredActions = React.useMemo(() => {
    let result = [...actions];

    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter(action => 
        action.name.toLowerCase().includes(searchLower) ||
        action.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(action => {
        if (filters.status === 'active') return action.status === 1;
        if (filters.status === 'inactive') return action.status === 0;
        return true;
      });
    }

    result.sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'oldest') {
        return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
      } else {
        return String(b.id).localeCompare(String(a.id), undefined, { numeric: true });
      }
    });

    return result;
  }, [actions, filters]);

  const hasActiveFilters = 
    filters.searchText.trim() !== '' || 
    filters.status !== 'all' || 
    filters.sortBy !== 'recent';

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="mx-12 pt-8 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
      </div>

      <div className="mx-12">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-base font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#28272A]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#28272A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar"
                value={filters.searchText}
                onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity relative"
              >
                <img 
                  src={FiltroIcon} 
                  alt="Filtros" 
                  className="w-4 h-4"
                />
                <span className="font-medium text-gray-800 text-sm">Filtros</span>
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {isFilterOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h3 className="font-semibold text-gray-900 text-sm">Filtros</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={() => {
                            setFilters({ searchText: '', status: 'all', sortBy: 'recent' });
                          }}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Ordenar por
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                      >
                        <option value="recent">Más recientes</option>
                        <option value="oldest">Más antiguos</option>
                        <option value="name">Nombre (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1a1f4e] text-white px-6 py-2.5 rounded-lg hover:bg-[#252a5e] transition-colors font-medium text-sm"
          >
            Crear tipo de categoría
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : filteredActions.length > 0 ? (
        <ActionsTable
          actions={filteredActions}
          pagination={pagination}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
          onDelete={openDeleteModal}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <div className="mx-12 bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">
            {hasActiveFilters 
              ? 'No se encontraron resultados con los filtros aplicados' 
              : 'No hay acciones disponibles'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => setFilters({ searchText: '', status: 'all', sortBy: 'recent' })}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear nueva categoría"
      >
        <CreateActionForm
          onSubmit={handleCreateAction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        itemName={actionToDelete?.name || ''}
        isLoading={isDeleting}
      />

      <DetailsModal
        isOpen={isDetailsModalOpen}
        action={selectedActionDetails}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedActionDetails(null);
        }}
      />
    </div>
  );
};
