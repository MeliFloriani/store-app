# Store App

Aplicación frontend de tienda desarrollada con React, TypeScript y Vite.

Este proyecto corresponde a la interfaz de usuario para clientes y fue configurado utilizando una arquitectura modular basada en features para mejorar la organización, escalabilidad y mantenibilidad del código.

---

# Tecnologías Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- Zustand
- Tailwind CSS

---

# Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd store-app
```

Instalar dependencias:

```bash
pnpm install
```

---

# Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

También se incluye un archivo:

```txt
.env.example
```

con las variables necesarias para el proyecto.

---

# Ejecutar el Proyecto

Iniciar servidor de desarrollo:

```bash
pnpm dev
```

El proyecto estará disponible en:

```txt
http://localhost:5173
```

---

# Scripts Disponibles

## Desarrollo

```bash
pnpm dev
```

## Build de Producción

```bash
pnpm build
```

## Preview de Producción

```bash
pnpm preview
```

---

# Estructura del Proyecto

```txt
src/
  features/
    products/
      components/
      hooks/
      pages/
      services/
      types.ts

  shared/
    lib/

  store/

  router/

  App.tsx
  main.tsx
```

---

# Arquitectura

El proyecto utiliza una arquitectura basada en módulos/features.

Cada feature contiene:

- components → componentes específicos del dominio
- hooks → lógica reutilizable y custom hooks
- pages → páginas y rutas
- services → integración con APIs
- types.ts → interfaces y tipos TypeScript

La carpeta `shared` contiene funcionalidades reutilizables globales.

---

# Configuraciones Implementadas

## Tailwind CSS

Tailwind está configurado globalmente mediante:

```css
@import "tailwindcss";
```

---

## React Query

Se configuró `QueryClientProvider` para manejo de fetching y cache de datos.

---

## React Router DOM

Se implementó navegación mediante `createBrowserRouter`.

---

## Zustand

Se creó un store global de carrito:

```txt
useCartStore
```

---

## Axios

Se configuró una instancia global de Axios utilizando variables de entorno.

Archivo:

```txt
src/shared/lib/axios.ts
```

---

# Estado Actual

Setup inicial completo con:

- Arquitectura modular
- Routing
- Estado global
- Configuración HTTP
- Tailwind CSS
- React Query

El proyecto quedó preparado para comenzar el desarrollo de funcionalidades de la tienda.

---

# Requisitos

- Node.js 20+
- pnpm

Verificar versiones:

```bash
node -v
pnpm -v
```

---

# Autor

Proyecto académico desarrollado para la entrega de setup inicial frontend.