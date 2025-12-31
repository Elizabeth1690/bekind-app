import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import dashboardBg from '../assets/images/dashboard-background.jpg';

import homeIcon from '../assets/icons/home.svg';
import impactoIcon from '../assets/icons/impacto-social.svg';
import comunidadIcon from '../assets/icons/comunidad.svg';
import sponsorsIcon from '../assets/icons/sponsors.svg';
import marketplaceIcon from '../assets/icons/marketplace.svg';
import bakanesIcon from '../assets/icons/bakanes.svg';
import contenidosIcon from '../assets/icons/contenidos.svg';
import categoriasIcon from '../assets/icons/categorias.svg';
import cerrarSesionIcon from '../assets/icons/cerrar-sesion.svg';

interface MenuItem {
  icon: string;
  label: string;
  id: string;
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [selectedId, setSelectedId] = useState('home');

  const menuItems: MenuItem[] = [
    { icon: homeIcon, label: 'Home', id: 'home' },
    { icon: impactoIcon, label: 'Impacto Social', id: 'impacto-social' },
    { icon: comunidadIcon, label: 'Comunidad', id: 'comunidad' },
    { icon: sponsorsIcon, label: 'Sponsors', id: 'sponsors' },
    { icon: marketplaceIcon, label: 'Marketplace', id: 'marketplace' },
    { icon: bakanesIcon, label: 'Bakanes', id: 'bakanes' },
    { icon: contenidosIcon, label: 'Contenidos', id: 'contenidos' },
    { icon: categoriasIcon, label: 'Categorías de acciones', id: 'categorias' },
  ];

  const handleMenuClick = (id: string) => {
    setSelectedId(id);
    console.log('Menú seleccionado:', id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="w-full h-44 overflow-hidden">
        <img 
          src={dashboardBg} 
          alt="Be Kind Network" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <nav className="flex-1 pb-20">
        {menuItems.map((item) => {
          const active = selectedId === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors relative ${
                active ? 'bg-cyan-50' : 'hover:bg-cyan-50'
              }`}
              style={{ fontSize: '14px', fontWeight: 400, color: '#28272A' }}
            >
              {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-600" />
              )}
              
              <img 
                src={item.icon} 
                alt={item.label}
                className="w-5 h-5"
              />
              
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
          style={{ fontSize: '14px', fontWeight: 400, color: '#28272A' }}
        >
          <img 
            src={cerrarSesionIcon} 
            alt="Cerrar sesión"
            className="w-5 h-5"
          />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
