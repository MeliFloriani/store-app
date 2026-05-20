import { api } from '../../../shared/lib/axios'
import type { Producto, ProductosParams } from '../types'

export async function getStoreProductos(
  params: ProductosParams = {},
): Promise<Producto[]> {
  const { data } = await api.get<Producto[]>('/productos', {
    params: {
      limit: 50,
      disponible: true,
      ...params,
    },
  })

  return data
}

export async function getStoreProducto(id: number): Promise<Producto> {
  const { data } = await api.get<Producto>(`/productos/${id}`)

  return data
}
