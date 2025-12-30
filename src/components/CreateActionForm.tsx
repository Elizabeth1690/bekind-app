import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateActionPayload } from '../types/action.types';
import { Input } from './Input';
import { Button } from './Button';

interface CreateActionFormProps {
  onSubmit: (data: CreateActionPayload) => Promise<void>;
  onCancel: () => void;
}

export const CreateActionForm: React.FC<CreateActionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateActionPayload>();

  const description = watch('description', '');

  const handleFormSubmit = async (data: CreateActionPayload) => {
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
    } catch (error) {
      // Error manejado por el componente padre
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Nombre de la categoría"
        placeholder="Escriba el nombre de la buena acción"
        error={errors.name?.message}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la buena acción
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
          rows={4}
          placeholder="Agregar descripción"
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
        <div className="flex justify-between mt-1">
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
          <p className="text-sm text-gray-500 ml-auto">{description.length}/200</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="logo-upload"
          />
          <label htmlFor="logo-upload" className="cursor-pointer">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Cargar archivo</p>
          </label>
        </div>
      </div>

      <Input
        label="Color"
        type="text"
        placeholder="Registra color código HEX"
        error={errors.color?.message}
        {...register('color', {
          pattern: {
            value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            message: 'Formato de color HEX inválido (ej: #FF5733)',
          },
        })}
      />

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm font-medium text-gray-700">Activo</span>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
        >
          Crear
        </Button>
      </div>
    </form>
  );
};
