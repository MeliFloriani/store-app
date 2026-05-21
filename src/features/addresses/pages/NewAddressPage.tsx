import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useCrearDireccion } from '../hooks/use-direcciones'
import {
  buildDireccionPayload,
  direccionToFormData,
} from '../types'
import type { DireccionFormData } from '../types'
import { getApiErrorMessage } from '../../../shared/lib/api-error'
import { AddressForm } from './AddressesPage'

function getErrorMessage(error: unknown) {
  return getApiErrorMessage(error)
}

export function NewAddressPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/store/direcciones'
  const [formData, setFormData] = useState<DireccionFormData>(
    direccionToFormData(null),
  )
  const [error, setError] = useState<string | null>(null)
  const createMutation = useCrearDireccion()

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
      await createMutation.mutateAsync(buildDireccionPayload(formData))
      navigate(redirect)
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link className="text-sm text-orange-600 hover:underline" to="/store/direcciones">
          ← Volver a direcciones
        </Link>
        <h1 className="mt-3 text-3xl font-bold">Nueva dirección</h1>
        <p className="text-slate-600">
          Cargá una dirección para recibir tus pedidos.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AddressForm
          error={error}
          formData={formData}
          isPending={createMutation.isPending}
          onChange={updateField}
          onSubmit={handleSubmit}
          submitLabel="Crear dirección"
        />
      </div>
    </section>
  )
}
