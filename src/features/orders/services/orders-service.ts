import { api } from '../../../shared/lib/axios'
import type { CrearPedidoPayload, Pedido } from '../types'

export async function crearPedido(payload: CrearPedidoPayload): Promise<Pedido> {
  const { data } = await api.post<Pedido>('/pedidos', payload)

  return data
}

export async function getPedidosPropios(): Promise<Pedido[]> {
  const { data } = await api.get<Pedido[]>('/pedidos')

  return data
}
