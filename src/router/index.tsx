import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AddressesPage } from '../features/addresses/pages/AddressesPage'
import { NewAddressPage } from '../features/addresses/pages/NewAddressPage'
import { CartPage } from '../features/orders/pages/cart-page'
import { OrdersPage } from '../features/orders/pages/orders-page'
import { ProductDetailPage } from '../features/products/pages/product-detail-page'
import { ProductsPage } from '../features/products/pages/products-page'
import { StoreLayout } from '../shared/components/store-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/store" />,
  },
  {
    path: '/store',
    element: <StoreLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'productos/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'carrito',
        element: <CartPage />,
      },
      {
        path: 'pedidos',
        element: <OrdersPage />,
      },
      {
        path: 'direcciones',
        element: <AddressesPage />,
      },
      {
        path: 'direcciones/nueva',
        element: <NewAddressPage />,
      },
    ],
  },
])
