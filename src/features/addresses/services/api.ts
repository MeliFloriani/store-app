import { api } from '../../../shared/lib/axios'
import type { DireccionEntrega, DireccionEntregaPayload } from '../types'

export async function listarDirecciones(): Promise<DireccionEntrega[]> {
  const { data } = await api.get<DireccionEntrega[]>('/direcciones-entrega')

  return data
}

export async function crearDireccion(
  data: DireccionEntregaPayload,
): Promise<DireccionEntrega> {
  const response = await api.post<DireccionEntrega>('/direcciones-entrega', data)

  return response.data
}

export async function actualizarDireccion(
  id: number,
  data: Partial<DireccionEntregaPayload>,
): Promise<DireccionEntrega> {
  const response = await api.put<DireccionEntrega>(`/direcciones-entrega/${id}`, data)

  return response.data
}

export async function eliminarDireccion(id: number): Promise<void> {
  await api.delete(`/direcciones-entrega/${id}`)
}

export async function marcarComoPrincipal(id: number): Promise<DireccionEntrega> {
  return actualizarDireccion(id, { es_principal: true })
}
