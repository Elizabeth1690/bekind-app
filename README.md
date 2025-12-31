# BeKind Network - Admin Dashboard

Aplicación web para administrar categorías de acciones en la plataforma BeKind Network. Construida con React 18, TypeScript, React Hook Form y Zustand.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Decisiones Técnicas](#decisiones-técnicas)
- [APIs Consumidas](#apis-consumidas)
- [Supuestos y Consideraciones](#supuestos-y-consideraciones)

---

## ✨ Características

### Implementadas (Obligatorias)
- ✅ **Autenticación**: Login con token JWT y protección de rutas privadas
- ✅ **Dashboard**: Listado paginado de categorías/acciones con estados de carga, error y vacío
- ✅ **Crear Acción**: Formulario completo con validaciones y upload de archivos
- ✅ **Paginación**: Control de número de página y tamaño (10, 20, 30, 50 items)
- ✅ **Estados de UI**: Loading, error, empty state y success feedback

### Adicionales (Plus)
- ✅ **Filtros Avanzados**: Búsqueda por texto, filtro por estado (activo/inactivo), ordenamiento
- ✅ **Eliminación**: Modal de confirmación para eliminar categorías (solo frontend)
- ✅ **Vista de Detalles**: Modal para ver información completa de una categoría
- ✅ **Notificaciones Toast**: Feedback visual para acciones exitosas/errores
- ✅ **Validaciones Robustas**: Formularios con validación en tiempo real
- ✅ **Preview de Imágenes**: Vista previa del archivo antes de subirlo
- ✅ **Diseño Responsive**: Interfaz adaptable a diferentes tamaños de pantalla

---

## 🔧 Requisitos Previos

- **Node.js**: v18 o superior
- **npm**: v9 o superior (o yarn/pnpm)
- **Navegador moderno**: Chrome, Firefox, Safari o Edge (última versión)

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Elizabeth1690/bekind-app.git
cd bekind-app

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

1. Crear un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

2. Editar `.env` con las URLs proporcionadas por el equipo de desarrollo:

```env
VITE_AUTH_BASE_URL=<URL_BASE_AUTENTICACION>
VITE_ACTIONS_BASE_URL=<URL_BASE_ACCIONES>
```

> ⚠️ **Nota de Seguridad**: Las URLs y credenciales reales no deben compartirse en repositorios públicos. Solicita acceso al equipo de desarrollo.

3. **Credenciales de prueba**: Solicitar al equipo técnico

---

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Build de Producción
```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios API
│   ├── authApi.ts         # Servicio de autenticación
│   ├── actionsApi.ts      # Servicio de acciones/categorías
│   └── axiosConfig.ts     # Configuración de Axios con interceptores
├── assets/                 # Recursos estáticos
│   ├── icons/             # Iconos SVG
│   └── images/            # Imágenes de fondo
├── components/            # Componentes reutilizables
│   ├── LoginForm.tsx      # Formulario de login
│   ├── CreateActionForm.tsx  # Formulario de creación
│   ├── ActionsTable.tsx   # Tabla con paginación
│   ├── Modal.tsx          # Modal genérico
│   ├── DeleteConfirmModal.tsx  # Modal de confirmación
│   ├── DetailsModal.tsx   # Modal de detalles
│   ├── Toast.tsx          # Sistema de notificaciones
│   ├── Navbar.tsx         # Barra de navegación
│   ├── Sidebar.tsx        # Menú lateral
│   └── Loader.tsx         # Indicador de carga
├── config/                # Configuración de la app
│   └── api.config.ts      # URLs base de las APIs
├── hooks/                 # Custom Hooks
│   ├── useActions.ts      # Lógica de acciones (CRUD + paginación)
│   └── useToast.ts        # Lógica de notificaciones
├── layouts/               # Layouts de página
│   └── DashboardLayout.tsx
├── pages/                 # Páginas principales
│   ├── Login.tsx
│   └── Dashboard.tsx
├── routes/                # Configuración de rutas
│   ├── AppRouter.tsx
│   └── ProtectedRoute.tsx
├── store/                 # Estado global (Zustand)
│   └── authStore.ts       # Store de autenticación
├── types/                 # TypeScript interfaces
│   ├── action.types.ts
│   └── auth.types.ts
├── utils/                 # Utilidades
│   └── constants.ts       # Constantes globales
├── App.tsx                # Componente raíz
└── main.tsx               # Entry point
```

---

## 🎯 Decisiones Técnicas

### 1. **Manejo de Estado**
- **Zustand** para autenticación global (simple, sin boilerplate)
- **React Hook Form** para formularios (mejor performance, validaciones declarativas)
- Estado local con `useState` para UI específica

### 2. **Consumo de APIs**
- **Axios** con interceptores para:
  - Inyección automática del token en headers (`Authorization: Bearer`)
  - Manejo centralizado de errores (401 → logout automático)
  - Logging de requests/responses en desarrollo
- Dos instancias separadas (`authApi` y `actionsApi`) para los dos subdominios

### 3. **Paginación**
- **Frontend 0-indexed**: UI comienza en página 0 para facilidad del usuario
- **Backend 1-indexed**: Se convierte automáticamente (`pageNumber + 1`) en el servicio
- Validación de rangos para evitar valores negativos o páginas inexistentes

### 4. **Validaciones de Formularios**
```typescript
// Ejemplo: CreateActionForm
- Nombre: 3-100 caracteres, requerido
- Descripción: 10-200 caracteres, requerido
- Color: Formato HEX válido (#RRGGBB), opcional
- Logo: Imagen requerida, max 5MB, solo imágenes
- Status: Toggle activo/inactivo (1/0)
```

### 5. **Manejo de Errores**
- Try-catch en todos los servicios API
- Mensajes de error específicos por código HTTP:
  - `401`: Sesión expirada → logout
  - `400/403`: Error de validación/permisos
  - `500`: Error del servidor
- Notificaciones toast para feedback inmediato

### 6. **Arquitectura de Componentes**
- **Componentes presentacionales**: Solo reciben props y renderizan UI
- **Componentes contenedores**: Manejan lógica (Dashboard, Login)
- **Custom Hooks**: Encapsulan lógica reutilizable (`useActions`, `useToast`)

---

## 🌐 Integración con APIs

La aplicación consume servicios REST para autenticación y gestión de categorías. Los detalles técnicos de los endpoints están disponibles en la documentación interna del proyecto.

**Características implementadas:**
- Autenticación con JWT Bearer Token
- Listado paginado de categorías
- Creación de categorías con upload de archivos
- Manejo de errores HTTP (401, 403, 500)

> 📋 Para más información sobre los endpoints, consultar la documentación técnica interna.

---

## 📝 Supuestos y Consideraciones

### 1. **Payload de Creación**
El endpoint `/admin-add` no documentaba el payload exacto. Se infirió del listado:
- Campos obligatorios: `name`, `description`, `icon`, `status`
- Campos opcionales: `color`
- Se implementó upload de archivo usando `FormData`

### 2. **Eliminación de Acciones**
No existe endpoint DELETE documentado. La funcionalidad:
- ✅ Implementada en frontend (elimina del estado local)
- ❌ No persiste en backend
- 📌 Incluye modal de confirmación para UX

### 3. **Estructura de Respuesta Variable**
El API devuelve estructuras inconsistentes:
```javascript
// Opción 1: data.data.data
{ data: { data: [...] } }

// Opción 2: data.data
{ data: [...] }

// Se implementó normalización en actionsService
```

### 4. **Manejo de Imágenes**
- Preview local del archivo antes de submit
- Validación de tamaño (max 5MB)
- Validación de tipo (solo imágenes)
- Fallback a placeholder si icon falla o no existe

### 5. **Filtros y Búsqueda**
Implementados 100% en frontend (sin endpoints específicos):
- Búsqueda por nombre/descripción (case-insensitive)
- Filtro por estado (activo/inactivo/todos)
- Ordenamiento (recientes, antiguos, alfabético)

### 6. **Tokens de Autenticación**
- Token guardado en `localStorage`
- Sin refresh token (logout manual o token expirado)
- Logout automático en 401 mediante interceptor

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| Framework | React | 18.3.1 | UI Library |
| Lenguaje | TypeScript | 5.6.2 | Tipado estático |
| Estado | Zustand | 5.0.2 | State management |
| Formularios | React Hook Form | 7.54.2 | Form handling |
| HTTP | Axios | 1.7.9 | API requests |
| Routing | React Router | 7.1.1 | Navegación SPA |
| Estilos | Tailwind CSS | 3.4.17 | Utility-first CSS |
| Build Tool | Vite | 6.0.5 | Dev server & bundler |

---

## 📸 Screenshots

### Login
![Login](docs/login-screenshot.png)

### Dashboard
![Dashboard](docs/dashboard-screenshot.png)

### Crear Acción
![Crear](docs/create-modal-screenshot.png)

---

## 🧪 Testing

Para ejecutar el checklist de QA funcional, consultar: [QA_CHECKLIST.md](./QA_CHECKLIST.md)

---

## 🚧 Mejoras Futuras

- [ ] Implementar endpoint DELETE real
- [ ] Agregar edición de categorías (PUT endpoint)
- [ ] Filtros desde backend con query params
- [ ] Refresh token automático
- [ ] Tests unitarios (Jest + React Testing Library)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] Internacionalización (i18n)
- [ ] Dark mode

---

## 👨‍💻 Autor

Desarrollado como prueba técnica para BeKind Network.

**Tiempo estimado de desarrollo**: 4 horas

---

## 📄 Licencia

Este proyecto es confidencial y de uso exclusivo para evaluación técnica.