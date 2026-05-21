# Store App - Tienda Publica

Tienda publica de FoodStore para clientes. Permite navegar el catalogo, ver detalle de productos, agregar productos al carrito y preparar pedidos sin pasarela de pago.

## Decision funcional

La store-app se mantiene publica por decision alineada a la consigna:

- No hay pantalla visible de login.
- No hay pantalla visible de registro.
- No hay links de "Iniciar sesion" ni "Registrarse".
- Productos, detalle y carrito son publicos.
- El carrito persiste en `localStorage` usando Zustand `persist`.
- No se usan tokens manuales, `Authorization Bearer`, `VITE_AUTH_TOKEN` ni `store-app-token`.
- Axios envia cookies automaticamente con `withCredentials: true`.

Los endpoints protegidos de cliente, como direcciones y pedidos propios, dependen de una cookie httpOnly `access_token` emitida por el backend para un usuario con rol `CLIENT`. Si no existe esa cookie, la UI muestra un mensaje amigable y no redirige a un login inexistente.

## Setup Local

```bash
cd store-app
pnpm install
cp .env.example .env
```

Configurar:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Levantar Vite:

```bash
pnpm run dev
```

URL local esperada:

```txt
http://localhost:5174
```

> Si `5174` esta ocupado, Vite asignara otro puerto. El backend debe estar corriendo en `http://localhost:8000` y permitir CORS con credentials para el origen usado.

## Build & Deployment

```bash
pnpm run build
pnpm run preview
```

El build genera archivos estaticos en `dist/`.

## Environment Variables

| Variable | Descripcion |
| --- | --- |
| VITE_API_URL | URL base del backend API. En local: http://localhost:8000/api/v1. |

## Estructura

```txt
src/
  features/
    products/    Hooks, servicios, tipos y paginas de productos.
    addresses/   Hooks, servicios, tipos y paginas de direcciones de entrega.
    orders/      Hooks, servicios, tipos y paginas de carrito/pedidos.
  store/          Zustand: cart store persistido.
  shared/         Axios config, layout y componentes comunes.
  router/         Rutas publicas de tienda.
```

## Funcionalidades

- Catalogo publico de productos.
- Detalle de producto.
- Carrito con persistencia en `localStorage`.
- Confirmacion de pedido sin pasarela de pago.
- Direcciones y pedidos propios si existe una cookie CLIENT valida.
- Manejo amigable de `401` cuando no hay sesion CLIENT.

## Flujo publico de usuario

1. Navega catalogo.
2. Agrega productos al carrito.
3. Revisa items y cantidades en `/store/carrito`.
4. Intenta confirmar pedido.
5. Si no hay cookie CLIENT valida, la UI informa que la tienda publica no incluye login visible y conserva el carrito.
6. Si hay cookie CLIENT valida, la creacion del pedido avanza usando cookies httpOnly con `withCredentials`.

## Rutas Principales

```txt
/store                         Catalogo de productos.
/store/productos/:id           Detalle de producto.
/store/carrito                 Carrito y confirmacion.
/store/pedidos                 Pedidos propios si hay cookie CLIENT valida.
/store/direcciones             Direcciones de entrega si hay cookie CLIENT valida.
/store/direcciones/nueva       Crear direccion si hay cookie CLIENT valida.
```

## Persistencia

- Carrito en `localStorage`.
  - Key: `foodstore-store-cart`.
- No se persisten credenciales ni tokens de autenticacion en `localStorage`.

## Integracion con Backend

Cliente Axios:

- `baseURL`: `import.meta.env.VITE_API_URL`.
- Fallback local: `http://localhost:8000/api/v1`.
- `withCredentials: true` para enviar/recibir cookies httpOnly.
- Sin header `Authorization` manual.

Endpoints principales consumidos:

```http
GET    /api/v1/productos
GET    /api/v1/productos/{id}
GET    /api/v1/direcciones-entrega
POST   /api/v1/direcciones-entrega
PUT    /api/v1/direcciones-entrega/{id}
DELETE /api/v1/direcciones-entrega/{id}
GET    /api/v1/pedidos
POST   /api/v1/pedidos
```

## Como probar endpoints protegidos de CLIENT

La store-app no implementa login/registro visible. Para probar direcciones y pedidos protegidos:

1. Crear o autenticar un usuario `CLIENT` desde Swagger/Postman contra el backend.
2. Asegurarse de que el navegador tenga la cookie httpOnly `access_token` para `localhost`.
3. Abrir store-app en `http://localhost:5174`.
4. Usar `/store/direcciones`, `/store/carrito` y `/store/pedidos`.

Sin cookie CLIENT valida, las pantallas muestran mensajes claros y no eliminan el carrito.

## Dependencias

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query
- React Router
- Zustand
- Axios
