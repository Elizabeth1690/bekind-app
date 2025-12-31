import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '../types/auth.types';
import logo from '../assets/images/logo-bekind.svg';
import emailIcon from '../assets/icons/mail.svg';
import lockIcon from '../assets/icons/leading-icon.svg';
import eyeIcon from '../assets/icons/trailing-icon.svg';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    watch,
  } = useForm<LoginCredentials>({
    mode: 'onBlur',
    reValidateMode: 'onChange',  
  });

  const username = watch('username');
  const password = watch('password');
  const isFormValid = username && password && password.length >= 6;

  const onSubmit = async (data: LoginCredentials) => {
    clearError();
    
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      {/* Logo y texto centrados */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="be kind network" 
            style={{ width: '160px', height: 'auto' }}
          />
        </div>
        
        <p className="font-roboto text-center text-black font-normal leading-tight text-xl">
          <span>¡Empieza a conectar tu comunidad ante</span>
          <br />
          <span>buenas acciones!</span>
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de correo */}
        <div>
          <label 
            htmlFor="email" 
            className="block font-medium mb-2 font-roboto"
            style={{ 
              fontSize: '14px', 
              lineHeight: '20px',
              color: '#28272A'
            }}
          >
            Correo Electrónico*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={emailIcon} alt="" className="w-5 h-5" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Ingresar correo"
              className={`w-full pl-10 pr-4 py-3.5 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-lato ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ height: '36px' }}
              {...register('username', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
            />
          </div>
          {/* ✅ Mostrar error si existe */}
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 font-lato">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Campo de contraseña */}
        <div>
          <label 
            htmlFor="password" 
            className="block font-medium mb-2 font-roboto"
            style={{ 
              fontSize: '14px', 
              lineHeight: '20px',
              color: '#28272A'
            }}
          >
            Contraseña*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={lockIcon} alt="" className="w-5 h-5" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              className={`w-full pl-10 pr-12 py-3.5 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-lato ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ height: '36px' }}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <img 
                src={eyeIcon} 
                alt="" 
                className="w-5 h-5" 
              />
            </button>
          </div>
          {/* ✅ Mostrar error si existe */}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 font-lato">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Link recuperar contraseña */}
        <div className="text-center">
          <button 
            type="button" 
            className="inline-block font-medium font-lato"
            style={{
              color: '#1E1B4D',
              fontSize: '14px',
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px'
            }}
          >
            Recuperar contraseña
          </button>
        </div>

        {/* Mensaje de error del servidor */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-lato">
            {authError}
          </div>
        )}

        {/* Botón de submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="rounded font-medium transition-colors font-lato flex items-center justify-center"
            style={{
              backgroundColor: isFormValid ? '#1E1B4D' : '#D2D1D4',
              color: isFormValid ? '#FFFFFF' : '#A8A8A8',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              opacity: isSubmitting ? 0.7 : 1,
              height: '36px',
              width: '240px'
            }}
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
};
