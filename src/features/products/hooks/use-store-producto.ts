import { useQuery } from '@tanstack/react-query'

import { getStoreProducto } from '../services/products-service'

export function useStoreProducto(id: number) {
  return useQuery({
    queryKey: ['store-producto', id],
    queryFn: () => getStoreProducto(id),
    enabled: Number.isFinite(id) && id > 0,
  })
}
