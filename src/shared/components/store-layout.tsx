import { Link, Outlet } from 'react-router-dom'

import { useCartStore } from '../../store/use-cart-store'

export function StoreLayout() {
  const totalItems = useCartStore((state) => state.totalItems())

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/store" className="text-xl font-bold text-orange-600">
            Food Store
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link className="hover:text-orange-600" to="/store">
              Productos
            </Link>
            <Link className="hover:text-orange-600" to="/store/pedidos">
              Mis pedidos
            </Link>
            <Link className="hover:text-orange-600" to="/store/direcciones">
              Direcciones
            </Link>
            <Link
              className="rounded-full bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
              to="/store/carrito"
            >
              Carrito ({totalItems})
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
