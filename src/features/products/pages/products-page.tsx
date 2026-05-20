import { Link } from 'react-router-dom'

import { useCartStore } from '../../../store/use-cart-store'
import { useStoreProductos } from '../hooks/use-store-productos'
import type { Producto } from '../types'

function ProductCard({ producto }: { producto: Producto }) {
  const addProduct = useCartStore((state) => state.addProduct)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-40 items-center justify-center bg-slate-100">
        {producto.imagenes_url ? (
          <img
            alt={producto.nombre}
            className="h-full w-full object-cover"
            src={producto.imagenes_url}
          />
        ) : (
          <span className="text-sm text-slate-400">Sin imagen</span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold">{producto.nombre}</h2>
          <p className="line-clamp-2 min-h-10 text-sm text-slate-600">
            {producto.descripcion ?? 'Producto de la tienda'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <strong className="text-xl text-orange-600">
            ${Number(producto.precio_base).toFixed(2)}
          </strong>
          {!producto.disponible && (
            <span className="rounded-full bg-slate-200 px-2 py-1 text-xs">
              No disponible
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium hover:bg-slate-50"
            to={`/store/productos/${producto.id}`}
          >
            Ver detalle
          </Link>
          <button
            className="flex-1 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!producto.disponible}
            onClick={() => addProduct(producto)}
            type="button"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductsPage() {
  const { data: productos = [], isLoading, isError } = useStoreProductos()

  if (isLoading) {
    return <p className="text-slate-600">Cargando productos...</p>
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        No pudimos cargar los productos. Verificá que la API esté disponible.
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Tienda
        </p>
        <h1 className="text-3xl font-bold">Elegí tus productos</h1>
        <p className="mt-2 text-slate-600">
          Armá tu pedido y confirmalo desde el carrito.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {productos.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          No hay productos disponibles por el momento.
        </div>
      )}
    </section>
  )
}
