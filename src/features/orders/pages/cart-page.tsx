import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDirecciones } from '../../addresses/hooks/use-direcciones'
import { getDireccionCompleta } from '../../addresses/types'
import { useCartStore } from '../../../store/use-cart-store'
import {
  CLIENT_SESSION_REQUIRED_MESSAGE,
  getApiErrorMessage,
} from '../../../shared/lib/api-error'
import { useCrearPedido } from '../hooks/use-crear-pedido'

const DEFAULT_FORMA_PAGO = 'EFECTIVO'

export function CartPage() {
  const navigate = useNavigate()
  const [notas, setNotas] = useState('')
  const [formaPagoCodigo, setFormaPagoCodigo] = useState(DEFAULT_FORMA_PAGO)
  const [direccionId, setDireccionId] = useState<number | ''>('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.subtotal())
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const crearPedidoMutation = useCrearPedido()
  const {
    data: direcciones = [],
    isLoading: isLoadingDirecciones,
    isError: isDireccionesError,
  } = useDirecciones()

  const direccionPrincipal = useMemo(
    () => direcciones.find((direccion) => direccion.es_principal) ?? direcciones[0],
    [direcciones],
  )

  useEffect(() => {
    if (direccionId || !direccionPrincipal) {
      return
    }

    setDireccionId(direccionPrincipal.id)
  }, [direccionId, direccionPrincipal])

  useEffect(() => {
    if (
      !isLoadingDirecciones &&
      !isDireccionesError &&
      items.length > 0 &&
      direcciones.length === 0
    ) {
      navigate('/store/direcciones/nueva?redirect=/store/carrito')
    }
  }, [direcciones.length, isDireccionesError, isLoadingDirecciones, items.length, navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    if (isDireccionesError) {
      setSubmitError(CLIENT_SESSION_REQUIRED_MESSAGE)
      return
    }

    if (!direccionId) {
      navigate('/store/direcciones/nueva?redirect=/store/carrito')
      return
    }

    crearPedidoMutation.mutate(
      {
        direccion_id: direccionId,
        forma_pago_codigo: formaPagoCodigo,
        notas: notas.trim() ? notas.trim() : null,
        detalles: items.map((item) => ({
          producto_id: item.productoId,
          cantidad: item.cantidad,
        })),
      },
      {
        onSuccess: (pedido) => {
          clearCart()
          navigate('/store/pedidos', {
            state: { message: `Pedido #${pedido.id} creado correctamente.` },
          })
        },
        onError: (error) => {
          setSubmitError(getApiErrorMessage(error))
        },
      },
    )
  }

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-slate-600">
          Agregá productos para confirmar tu pedido.
        </p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
          to="/store"
        >
          Ver productos
        </Link>
      </section>
    )
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Carrito</h1>
          <p className="text-slate-600">Revisá tu pedido antes de confirmarlo.</p>
        </div>

        {items.map((item) => (
          <article
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            key={item.productoId}
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
              {item.imagenUrl ? (
                <img
                  alt={item.nombre}
                  className="h-full w-full object-cover"
                  src={item.imagenUrl}
                />
              ) : (
                <span className="text-xs text-slate-400">Sin imagen</span>
              )}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold">{item.nombre}</h2>
              <p className="text-sm text-slate-600">
                ${item.precioUnitario.toFixed(2)} c/u
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="h-9 w-9 rounded-lg border border-slate-300"
                onClick={() => updateQuantity(item.productoId, item.cantidad - 1)}
                type="button"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{item.cantidad}</span>
              <button
                className="h-9 w-9 rounded-lg border border-slate-300"
                onClick={() => updateQuantity(item.productoId, item.cantidad + 1)}
                type="button"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ${(item.precioUnitario * item.cantidad).toFixed(2)}
              </p>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => removeItem(item.productoId)}
                type="button"
              >
                Quitar
              </button>
            </div>
          </article>
        ))}
      </div>

      <form
        className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Confirmación</h2>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">Dirección de entrega</span>
            <Link
              className="text-sm font-medium text-orange-600 hover:underline"
              to="/store/direcciones/nueva?redirect=/store/carrito"
            >
              Agregar nueva
            </Link>
          </div>

          {isLoadingDirecciones ? (
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              Cargando direcciones...
            </p>
          ) : isDireccionesError ? (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              {CLIENT_SESSION_REQUIRED_MESSAGE}
            </p>
          ) : (
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              onChange={(event) => setDireccionId(Number(event.target.value))}
              required
              value={direccionId}
            >
              <option value="" disabled>
                Seleccioná una dirección
              </option>
              {direcciones.map((direccion) => (
                <option key={direccion.id} value={direccion.id}>
                  {direccion.alias ? `${direccion.alias} - ` : ''}
                  {getDireccionCompleta(direccion)}
                  {direccion.es_principal ? ' (principal)' : ''}
                </option>
              ))}
            </select>
          )}
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Forma de pago</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => setFormaPagoCodigo(event.target.value)}
            value={formaPagoCodigo}
          >
            <option value="EFECTIVO">Efectivo</option>
            <option value="MERCADOPAGO">Mercado Pago</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Notas para el pedido</span>
          <textarea
            className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => setNotas(event.target.value)}
            placeholder="Ej: sin sal, tocar timbre..."
            value={notas}
          />
        </label>

        <div className="space-y-2 border-t border-slate-200 pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <p className="text-xs text-slate-500">
            La API calculará envío, descuentos y total final al crear el pedido.
          </p>
        </div>

        {crearPedidoMutation.isError && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            {submitError ??
              getApiErrorMessage(
                crearPedidoMutation.error,
                'No se pudo crear el pedido. Reintentá en unos instantes.',
              )}
          </p>
        )}

        {!crearPedidoMutation.isError && submitError && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            {submitError}
          </p>
        )}

        <button
          className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={crearPedidoMutation.isPending || isLoadingDirecciones || !direccionId}
          type="submit"
        >
          {crearPedidoMutation.isPending ? 'Confirmando...' : 'Confirmar pedido'}
        </button>
      </form>
    </section>
  )
}
