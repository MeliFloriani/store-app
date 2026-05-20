import { useLocation } from 'react-router-dom'

import { useStorePedidos } from '../hooks/use-store-pedidos'

type LocationState = {
  message?: string
}

export function OrdersPage() {
  const location = useLocation()
  const state = location.state as LocationState | null
  const { data: pedidos = [], isLoading, isError } = useStorePedidos()

  if (isLoading) {
    return <p className="text-slate-600">Cargando pedidos...</p>
  }

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Mis pedidos</h1>
        <p className="text-slate-600">Consultá el estado de tus pedidos propios.</p>
      </div>

      {state?.message && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {state.message}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          No pudimos cargar tus pedidos. Iniciá sesión como cliente y reintentá.
        </div>
      )}

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            key={pedido.id}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Pedido #{pedido.id}</h2>
                <p className="text-sm text-slate-500">
                  {new Date(pedido.created_at).toLocaleString()}
                </p>
              </div>
              <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {pedido.estado_codigo}
              </span>
            </div>

            <ul className="mt-4 divide-y divide-slate-100">
              {pedido.detalles.map((detalle) => (
                <li
                  className="flex justify-between gap-4 py-2 text-sm"
                  key={detalle.id}
                >
                  <span>
                    {detalle.cantidad} × {detalle.nombre_producto}
                  </span>
                  <strong>${Number(detalle.subtotal).toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
              <span>Total</span>
              <strong className="text-lg text-orange-600">
                ${Number(pedido.total).toFixed(2)}
              </strong>
            </div>
          </article>
        ))}
      </div>

      {!isError && pedidos.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          Todavía no tenés pedidos.
        </div>
      )}
    </section>
  )
}
