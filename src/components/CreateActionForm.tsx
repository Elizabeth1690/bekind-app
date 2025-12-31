import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateActionPayload } from '../types/action.types';

interface CreateActionFormProps {
  onSubmit: (data: CreateActionPayload, file?: File) => Promise<void>;
  onCancel: () => void;
}

export const CreateActionForm: React.FC<CreateActionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateActionPayload>({
    mode: 'onChange',
  });

  const description = watch('description', '');
  const name = watch('name', '');
  
  const isFormValid = 
    name.trim().length >= 3 && 
    description.trim().length >= 10 && 
    selectedFile !== null;


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede superar 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFormSubmit = async (data: CreateActionPayload) => {
    setIsSubmitting(true);
    
    try {
      const payload: CreateActionPayload = {
        name: data.name,
        description: data.description,
        color: data.color || undefined,
        status: isActive ? 1 : 0,
      };
      
      await onSubmit(payload, selectedFile || undefined);
    } catch (error) {
      console.error('Error en formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Campo: Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Nombre de la categoría*
        </label>
        <input
          type="text"
          placeholder="Escriba el nombre de la buena acción"
          className={`w-full px-3 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('name', {
            required: 'El nombre es requerido',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres',
            },
            maxLength: {
              value: 100,
              message: 'El nombre no puede exceder 100 caracteres',
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Campo: Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Descripción de la buena acción*
        </label>
        <textarea
          placeholder="Agregar descripción"
          rows={3}
          className={`w-full px-3 py-2.5 border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('description', {
            required: 'La descripción es requerida',
            minLength: {
              value: 10,
              message: 'La descripción debe tener al menos 10 caracteres',
            },
            maxLength: {
              value: 200,
              message: 'La descripción no puede exceder 200 caracteres',
            },
          })}
        />
        <div className="flex justify-between items-center mt-1">
          <div className="flex-1">
            {errors.description && (
              <p className="text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>
          <p className="text-xs text-gray-500 ml-2">{description.length}/200</p>
        </div>
      </div>

      {/* Campo: Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Logo*
        </label>
        
        {!filePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="logo-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600">Cargar archivo</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative border border-gray-300 rounded p-3">
            <div className="flex items-center gap-3">
              <img 
                src={filePreview} 
                alt="Preview" 
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedFile && (selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Campo: Color */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Color*
        </label>
        <input
          type="text"
          placeholder="Registra color código HEX"
          className={`w-full px-3 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.color ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('color', {
            pattern: {
              value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              message: 'Formato de color HEX inválido (ej: #FF5733)',
            },
          })}
        />
        {errors.color && (
          <p className="mt-1 text-xs text-red-600">{errors.color.message}</p>
        )}
      </div>

      {/* Campo: Toggle Activo */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isActive ? 'bg-cyan-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isActive ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-900">
          Activo
        </span>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="flex-1 px-4 py-2.5 border border-transparent rounded text-sm font-medium transition-colors"
          style={{
            backgroundColor: isFormValid ? '#1E1B4D' : '#D2D1D4',
            color: isFormValid ? '#FFFFFF' : '#A8A8A8',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Creando...' : 'Crear'}
        </button>
      </div>
    </form>
  );
};
