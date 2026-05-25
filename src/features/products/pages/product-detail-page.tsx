import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useCartStore } from '../../../store/use-cart-store'
import { ProductAddedToast } from '../../../shared/components/product-added-toast'
import { useStoreProducto } from '../hooks/use-store-producto'

export function ProductDetailPage() {
  const { id } = useParams()
  const productoId = Number(id)
  const { data: producto, isLoading, isError } = useStoreProducto(productoId)
  const addProduct = useCartStore((state) => state.addProduct)
  const [showAddedToast, setShowAddedToast] = useState(false)

  const notifyProductAdded = () => {
    setShowAddedToast(false)
    window.setTimeout(() => setShowAddedToast(true), 0)
  }

  useEffect(() => {
    if (!showAddedToast) return

    const timeoutId = window.setTimeout(() => {
      setShowAddedToast(false)
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [showAddedToast])

  if (isLoading) {
    return <p className="text-slate-600">Cargando producto...</p>
  }

  if (isError || !producto) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          No pudimos encontrar el producto solicitado.
        </p>
        <Link className="text-orange-600 hover:underline" to="/store">
          Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <ProductAddedToast visible={showAddedToast} />

      <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-slate-100">
        {producto.imagenes_url ? (
          <img
            alt={producto.nombre}
            className="h-full w-full object-cover"
            src={producto.imagenes_url}
          />
        ) : (
          <span className="text-slate-400">Sin imagen</span>
        )}
      </div>

      <div className="space-y-5">
        <Link className="text-sm text-orange-600 hover:underline" to="/store">
          ← Volver
        </Link>
        <div>
          <h1 className="text-4xl font-bold">{producto.nombre}</h1>
          <p className="mt-3 text-slate-600">
            {producto.descripcion ?? 'Producto disponible en Food Store.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Precio</p>
          <p className="text-3xl font-bold text-orange-600">
            ${Number(producto.precio_base).toFixed(2)}
          </p>
          {producto.tiempo_prep_min != null && (
            <p className="mt-2 text-sm text-slate-600">
              Tiempo estimado: {producto.tiempo_prep_min} min
            </p>
          )}
        </div>

        {producto.ingredientes && producto.ingredientes.length > 0 && (
          <div>
            <h2 className="font-semibold">Ingredientes</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {producto.ingredientes.map((ingrediente) => (
                <li
                  className="rounded-full bg-white px-3 py-1 text-sm shadow-sm"
                  key={ingrediente.id}
                >
                  {ingrediente.nombre}
                  {ingrediente.es_alergeno ? ' ⚠️' : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!producto.disponible}
          onClick={() => {
            addProduct(producto)
            notifyProductAdded()
          }}
          type="button"
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  )
}
