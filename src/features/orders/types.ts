export type CrearPedidoDetalle = {
  producto_id: number
  cantidad: number
}

export type CrearPedidoPayload = {
  direccion_id?: number | null
  forma_pago_codigo: string
  notas?: string | null
  detalles: CrearPedidoDetalle[]
}

export type DetallePedido = {
  id: number
  pedido_id: number
  producto_id: number
  cantidad: number
  precio_unitario: string | number
  nombre_producto: string
  subtotal: string | number
  created_at: string
}

export type HistorialEstadoPedido = {
  id: number
  pedido_id: number
  estado_anterior_codigo?: string | null
  estado_nuevo_codigo: string
  usuario_id: number
  motivo?: string | null
  created_at: string
}

export type Pedido = {
  id: number
  usuario_id: number
  direccion_id?: number | null
  forma_pago_codigo: string
  estado_codigo: string
  subtotal: string | number
  descuento: string | number
  costo_envio: string | number
  total: string | number
  notas?: string | null
  created_at: string
  updated_at: string
  detalles: DetallePedido[]
  historial: HistorialEstadoPedido[]
}
