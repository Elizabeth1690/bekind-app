# QA Checklist - BeKind Network Admin

## Información del Tester
- **Fecha**: 30-12-2025_______________
- **Navegador**: Chrome / Firefox / Safari / Edge (marcar)
- **Resolución**: _______________

---

## ✅ Flujo de Autenticación (Login)

### TC-001: Login Exitoso
- [ ] Navegar a `/login`
- [ ] Ingresar credenciales válidas proporcionadas por el equipo técnico
- [ ] Hacer clic en "Ingresar"
- [ ] **Resultado Esperado**: Muestra loader, redirige a `/dashboard`, token guardado en localStorage

### TC-002: Login con Credenciales Inválidas
- [ ] Ingresar usuario: `test@invalid.com`
- [ ] Ingresar contraseña: `wrongpassword`
- [ ] Hacer clic en "Ingresar"
- [ ] **Resultado Esperado**: Muestra mensaje de error "Usuario o contraseña incorrectos" sin redirección

### TC-003: Validación de Formulario de Login
- [ ] Dejar campo de email vacío, intentar submit
- [ ] **Resultado Esperado**: Botón "Ingresar" deshabilitado (fondo gris)
- [ ] Ingresar email inválido (ej: "test@"), intentar submit
- [ ] **Resultado Esperado**: Mensaje de error "Correo electrónico inválido"
- [ ] Ingresar contraseña con menos de 6 caracteres
- [ ] **Resultado Esperado**: Mensaje de error "La contraseña debe tener al menos 6 caracteres"

### TC-004: Protección de Rutas
- [ ] Sin estar autenticado, intentar acceder a `/dashboard`
- [ ] **Resultado Esperado**: Redirige automáticamente a `/login`
- [ ] Después de login exitoso, intentar acceder a `/login`
- [ ] **Resultado Esperado**: Redirige automáticamente a `/dashboard`

---

## 📋 Flujo de Dashboard (Listado)

### TC-005: Carga Inicial del Dashboard
- [ ] Completar login exitoso
- [ ] **Resultado Esperado**:
  - Muestra loader mientras carga datos
  - Lista de categorías renderizada (mínimo 1 item)
  - Paginación muestra "1 - 10 de X" correctamente
  - Botón "Crear tipo de categoría" visible

### TC-006: Paginación - Cambio de Página
- [ ] En el dashboard, hacer clic en botón "Siguiente" (→)
- [ ] **Resultado Esperado**: Carga página 2, URL NO cambia, contador actualizado a "11 - 20 de X"
- [ ] Hacer clic en botón "Anterior" (←)
- [ ] **Resultado Esperado**: Regresa a página 1
- [ ] Hacer clic en botón "Primera página" (⏮)
- [ ] **Resultado Esperado**: Va a página 1 (deshabilitado si ya está ahí)
- [ ] Hacer clic en botón "Última página" (⏭)
- [ ] **Resultado Esperado**: Va a última página disponible

### TC-007: Paginación - Cambio de Tamaño
- [ ] En el selector "Resultados por página", seleccionar "20"
- [ ] **Resultado Esperado**: Muestra 20 items, contador actualizado, regresa a página 1
- [ ] Seleccionar "50"
- [ ] **Resultado Esperado**: Muestra hasta 50 items (o todos si son menos)

### TC-008: Estados de UI - Loading
- [ ] Forzar una carga lenta (DevTools → Network → Slow 3G)
- [ ] Cambiar de página
- [ ] **Resultado Esperado**: Muestra spinner de carga centrado

### TC-009: Estados de UI - Empty State
- [ ] Aplicar filtro que NO tenga resultados (ej: buscar "XYZ123")
- [ ] **Resultado Esperado**: Muestra mensaje "No se encontraron resultados con los filtros aplicados"
- [ ] Botón "Limpiar filtros" visible y funcional

---

## 🔍 Flujo de Filtros

### TC-010: Búsqueda por Texto
- [ ] En el campo "Buscar", escribir nombre de una categoría existente
- [ ] **Resultado Esperado**: Lista filtrada en tiempo real (case-insensitive)
- [ ] Borrar texto
- [ ] **Resultado Esperado**: Lista completa restaurada

### TC-011: Filtro por Estado
- [ ] Hacer clic en "Filtros"
- [ ] Seleccionar "Estado: Activos"
- [ ] **Resultado Esperado**: Solo muestra categorías con badge verde "Activo"
- [ ] Seleccionar "Estado: Inactivos"
- [ ] **Resultado Esperado**: Solo muestra categorías "Inactivo"
- [ ] Indicador rojo en botón "Filtros" cuando hay filtros activos

### TC-012: Ordenamiento
- [ ] Abrir "Filtros" → "Ordenar por: Nombre (A-Z)"
- [ ] **Resultado Esperado**: Lista ordenada alfabéticamente
- [ ] Seleccionar "Más antiguos"
- [ ] **Resultado Esperado**: Lista ordenada por ID ascendente
- [ ] Botón "Limpiar" en modal de filtros restablece todos los valores

---

## ➕ Flujo de Creación de Acción

### TC-013: Abrir Modal de Creación
- [ ] Hacer clic en "Crear tipo de categoría"
- [ ] **Resultado Esperado**:
  - Modal se abre con título "Crear nueva categoría"
  - Todos los campos vacíos
  - Toggle "Activo" encendido (cyan) por defecto
  - Botón "Crear" deshabilitado (fondo gris)

### TC-014: Validaciones de Formulario
- [ ] Ingresar nombre con 2 caracteres → **Error**: "El nombre debe tener al menos 3 caracteres"
- [ ] Ingresar descripción con 9 caracteres → **Error**: "La descripción debe tener al menos 10 caracteres"
- [ ] Ingresar color inválido "red" → **Error**: "Formato de color HEX inválido"
- [ ] Intentar submit sin subir archivo → **Resultado**: Botón permanece deshabilitado

### TC-015: Creación Exitosa
- [ ] Llenar todos los campos:
  - Nombre: "Categoría de Prueba"
  - Descripción: "Esta es una descripción de prueba con más de 10 caracteres"
  - Color: "#FF5733"
  - Logo: Subir imagen válida (PNG/JPG < 5MB)
- [ ] Toggle "Activo" encendido
- [ ] Hacer clic en "Crear"
- [ ] **Resultado Esperado**:
  - Muestra "Creando..." en botón
  - Modal se cierra
  - Toast verde aparece: "¡Categoría creada exitosamente!"
  - Nueva categoría aparece en la lista (página 1)

### TC-016: Preview de Archivo
- [ ] En modal de creación, hacer clic en "Cargar archivo"
- [ ] Seleccionar imagen
- [ ] **Resultado Esperado**: Muestra preview de la imagen con nombre y tamaño
- [ ] Hacer clic en botón "X" (eliminar)
- [ ] **Resultado Esperado**: Vuelve al estado inicial de carga

### TC-017: Cancelar Creación
- [ ] Llenar campos parcialmente
- [ ] Hacer clic en "Cancelar"
- [ ] **Resultado Esperado**: Modal se cierra, datos NO se guardan

---

## 🗑️ Flujo de Eliminación

### TC-018: Eliminar Categoría
- [ ] En la tabla, hacer clic en icono de papelera (eliminar) de cualquier categoría
- [ ] **Resultado Esperado**: Modal de confirmación aparece con nombre de la categoría
- [ ] Hacer clic en "Eliminar"
- [ ] **Resultado Esperado**:
  - Muestra "Eliminando..." en botón
  - Modal se cierra
  - Toast verde: "Categoría eliminada correctamente"
  - Categoría desaparece de la lista
  - **NOTA**: Cambio solo en frontend, no persiste

### TC-019: Cancelar Eliminación
- [ ] Hacer clic en icono de eliminar
- [ ] En modal de confirmación, hacer clic en "Cancelar"
- [ ] **Resultado Esperado**: Modal se cierra, categoría permanece en la lista

---

## 👁️ Flujo de Detalles

### TC-020: Ver Detalles de Categoría
- [ ] Hacer clic en icono de ojo (ver detalles) en cualquier categoría
- [ ] **Resultado Esperado**:
  - Modal se abre con toda la información:
    - Icono/logo (si existe)
    - Nombre
    - Descripción completa
    - Color (visual + código HEX)
    - Estado (Activo/Inactivo)
    - Fecha de creación
  - Botón "Cerrar" funcional
  - Clic en overlay (fondo oscuro) cierra el modal

---

## 🚪 Flujo de Cierre de Sesión

### TC-021: Logout
- [ ] Hacer clic en "Cerrar sesión" en el sidebar
- [ ] **Resultado Esperado**:
  - Redirige a `/login`
  - Token eliminado de localStorage
  - Intentar regresar a `/dashboard` → redirige a `/login`

---

## 🎨 Validaciones de UI/UX

### TC-022: Responsive Design
- [ ] Cambiar resolución a 1024px (tablet)
- [ ] **Resultado Esperado**: Sidebar y tabla se ajustan correctamente
- [ ] Cambiar a 768px (móvil)
- [ ] **Resultado Esperado**: Tabla tiene scroll horizontal, modales responsivos

### TC-023: Estados Hover/Focus
- [ ] Pasar mouse sobre botones
- [ ] **Resultado Esperado**: Cambio de color visible
- [ ] Usar Tab para navegar por formularios
- [ ] **Resultado Esperado**: Indicadores de foco (anillo azul) visibles

### TC-024: Manejo de Errores de Red
- [ ] Desconectar internet (o DevTools → Offline)
- [ ] Intentar login
- [ ] **Resultado Esperado**: Toast rojo con mensaje "No se pudo conectar con el servidor"
- [ ] Intentar crear categoría
- [ ] **Resultado Esperado**: Error manejado con mensaje apropiado

---

## 📊 Resumen de Pruebas

| Estado | Descripción |
|--------|-------------|
| ✅ PASS | Funcionalidad correcta según especificación |
| ❌ FAIL | Funcionalidad con errores o no cumple expectativa |
| ⚠️ SKIP | No se pudo probar (ambiente, permisos, etc.) |

**Total de Casos**: 24  
**Casos Aprobados**: ___  
**Casos Fallidos**: ___  
**Casos Omitidos**: ___

---

## 🐛 Bugs Encontrados

| ID | Descripción | Severidad | Pasos para Reproducir |
|----|-------------|-----------|------------------------|
| BUG-001 | | Alta / Media / Baja | |
| BUG-002 | | Alta / Media / Baja | |

---

## 💡 Observaciones Adicionales

_(Espacio para notas, sugerencias de mejora, edge cases encontrados, etc.)_

---

**Firma del Tester**: Elizabeth Echavarria 
**Fecha de Finalización**: 30/12/2025