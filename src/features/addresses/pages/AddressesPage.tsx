import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import {
  useActualizarDireccion,
  useDirecciones,
  useEliminarDireccion,
  useMarcarPrincipal,
} from '../hooks/use-direcciones'
import {
  buildDireccionPayload,
  direccionToFormData,
  getDireccionCompleta,
} from '../types'
import type { DireccionEntrega, DireccionFormData } from '../types'

function getErrorMessage(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response
  ) {
    const response = error.response as { data?: { detail?: string } }
    return response.data?.detail ?? 'Error inesperado'
  }

  return error instanceof Error ? error.message : 'Error inesperado'
}

function AddressFormModal({
  direccion,
  onClose,
}: {
  direccion: DireccionEntrega
  onClose: () => void
}) {
  const [formData, setFormData] = useState<DireccionFormData>(
    direccionToFormData(direccion),
  )
  const [error, setError] = useState<string | null>(null)
  const updateMutation = useActualizarDireccion()

  const updateField = <T extends keyof DireccionFormData>(
    field: T,
    value: DireccionFormData[T],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await updateMutation.mutateAsync({
        id: direccion.id,
        data: buildDireccionPayload(formData),
      })
      onClose()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Editar dirección</h2>
          <button
            className="text-slate-500 hover:text-slate-900"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <AddressForm
          error={error}
          formData={formData}
          isPending={updateMutation.isPending}
          onChange={updateField}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  )
}

function AddressForm({
  formData,
  error,
  isPending,
  submitLabel,
  onChange,
  onSubmit,
}: {
  formData: DireccionFormData
  error?: string | null
  isPending?: boolean
  submitLabel: string
  onChange: <T extends keyof DireccionFormData>(
    field: T,
    value: DireccionFormData[T],
  ) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium">Alias</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('alias', event.target.value)}
            placeholder="Casa, Trabajo..."
            value={formData.alias}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Teléfono</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('telefono', event.target.value)}
            placeholder="Opcional"
            value={formData.telefono}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
        <label className="space-y-1">
          <span className="text-sm font-medium">Calle</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('calle', event.target.value)}
            required
            value={formData.calle}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Número</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('numero', event.target.value)}
            required
            value={formData.numero}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium">Piso / Depto</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('piso', event.target.value)}
            value={formData.piso}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Localidad</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('localidad', event.target.value)}
            required
            value={formData.localidad}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1">
          <span className="text-sm font-medium">Provincia</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('provincia', event.target.value)}
            value={formData.provincia}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Código postal</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('codigoPostal', event.target.value)}
            value={formData.codigoPostal}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">País</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            onChange={(event) => onChange('pais', event.target.value)}
            value={formData.pais}
          />
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input
          checked={formData.esPrincipal}
          className="h-4 w-4 accent-orange-600"
          onChange={(event) => onChange('esPrincipal', event.target.checked)}
          type="checkbox"
        />
        <span className="text-sm font-medium">Marcar como principal</span>
      </label>

      <button
        className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export function AddressesPage() {
  const { data: direcciones = [], isLoading, isError } = useDirecciones()
  const [editing, setEditing] = useState<DireccionEntrega | null>(null)
  const deleteMutation = useEliminarDireccion()
  const principalMutation = useMarcarPrincipal()

  const handleDelete = async (direccion: DireccionEntrega) => {
    if (!confirm(`¿Eliminar la dirección "${direccion.alias ?? direccion.linea1}"?`)) {
      return
    }

    await deleteMutation.mutateAsync(direccion.id)
  }

  if (isLoading) {
    return <p className="text-slate-600">Cargando direcciones...</p>
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        No pudimos cargar tus direcciones. Iniciá sesión como cliente y reintentá.
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Direcciones de entrega</h1>
          <p className="text-slate-600">Gestioná tus direcciones guardadas.</p>
        </div>

        <Link
          className="rounded-xl bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700"
          to="/store/direcciones/nueva"
        >
          + Nueva dirección
        </Link>
      </div>

      {direcciones.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold">No tenés direcciones cargadas</h2>
          <p className="mt-2 text-slate-600">
            Agregá una dirección para poder finalizar tus pedidos.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {direcciones.map((direccion) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              key={direccion.id}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold">
                      {direccion.alias || 'Dirección'}
                    </h2>
                    {direccion.es_principal && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700">{getDireccionCompleta(direccion)}</p>
                  {direccion.etiqueta && (
                    <p className="text-sm text-slate-500">Tel: {direccion.etiqueta}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {!direccion.es_principal && (
                    <button
                      className="rounded-lg border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={principalMutation.isPending}
                      onClick={() => principalMutation.mutate(direccion.id)}
                      type="button"
                    >
                      Marcar principal
                    </button>
                  )}
                  <button
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                    onClick={() => setEditing(direccion)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(direccion)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <AddressFormModal direccion={editing} onClose={() => setEditing(null)} />
      )}
    </section>
  )
}

export { AddressForm }
