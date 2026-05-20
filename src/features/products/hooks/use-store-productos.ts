import { useQuery } from '@tanstack/react-query'

import { getStoreProductos } from '../services/products-service'
import type { ProductosParams } from '../types'

export function useStoreProductos(params: ProductosParams = {}) {
  return useQuery({
    queryKey: ['store-productos', params],
    queryFn: () => getStoreProductos(params),
  })
}
