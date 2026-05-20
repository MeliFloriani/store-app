# Store App - Tienda Pública

Tienda pública de FoodStore para clientes. Permite navegar el catálogo, agregar productos al carrito, gestionar direcciones y confirmar pedidos.

## Setup Local

```bash
cd store-app
npm install
cp .env.example .env
```

Configurar:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Levantar Vite:

```bash
npm run dev
```

URL local esperada:

```txt
http://localhost:5174
```

> Si `5174` está ocupado, Vite asignará otro puerto. El backend debe estar corriendo en `http://localhost:8000`.

## Build & Deployment

```bash
npm run build
npm run preview
```

El build genera archivos estáticos en `dist/`.

## Environment Variables

| Variable | Descripción |
| --- | --- |
| VITE_API_URL | URL base del backend API. En local: http://localhost:8000/api/v1. |

## Estructura

```txt
src/
  features/
    products/    Hooks, servicios, tipos y páginas de productos.
    addresses/   Hooks, servicios, tipos y páginas de direcciones de entrega.
    orders/      Hooks, servicios, tipos y páginas de carrito/pedidos.
  pages/          Páginas de tienda si se agregan a nivel global.
  store/          Zustand: cart store y, si aplica, auth store.
  shared/         Axios config, layout y componentes comunes.
  router/         Rutas públicas y autenticadas.
```

## Funcionalidades

- Catálogo público de productos.
- Detalle de producto.
- Carrito con persistencia en `localStorage`.
- Crear cuenta / Login, si está habilitado.
- Gestión de direcciones de entrega.
- Checkout con selección de dirección principal.
- Historial de pedidos para usuarios autenticados.

## Flujo de Usuario

1. Navega catálogo.
2. Agrega productos al carrito.
3. Carrito: revisa items y cantidades.
4. Checkout: crea cuenta o inicia sesión, si corresponde.
5. Crea o selecciona dirección de entrega.
6. Confirma pedido.
7. Consulta historial de pedidos.

## Rutas Principales

```txt
/store                         Catálogo de productos.
/store/productos/:id           Detalle de producto.
/store/carrito                 Carrito y confirmación.
/store/pedidos                 Pedidos propios.
/store/direcciones             Direcciones de entrega.
/store/direcciones/nueva       Crear dirección.
```

## Persistencia

- Carrito en `localStorage`.
  - Key actual: `foodstore-store-cart`.
  - Referencia funcional: `store-app-cart`.
- Token en `localStorage`.
  - Key esperada para requests: `store-app-token`.

## Integración con Backend

Endpoints principales consumidos:

```http
GET  /api/v1/productos
GET  /api/v1/productos/{id}
GET  /api/v1/direcciones-entrega
POST /api/v1/direcciones-entrega
PUT  /api/v1/direcciones-entrega/{id}
DELETE /api/v1/direcciones-entrega/{id}
GET  /api/v1/pedidos
POST /api/v1/pedidos
```

## Dependencias

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- React Router
- Zustand
- Axios

## Notas de Autenticación

Algunos endpoints, como direcciones y pedidos propios, requieren usuario autenticado con rol `CLIENT`.

Durante desarrollo, si todavía no hay login de tienda, el cliente Axios puede usar un token guardado en:

```txt
localStorage.store-app-token
```

## Ejemplo de flujo local

1. Iniciar backend en puerto `8000`.
2. Iniciar store-app.
3. Abrir `/store`.
4. Agregar productos al carrito.
5. Crear dirección desde `/store/direcciones/nueva`.
6. Confirmar pedido desde `/store/carrito`.
