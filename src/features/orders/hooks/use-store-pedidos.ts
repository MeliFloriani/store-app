import { useQuery } from '@tanstack/react-query'

import { getPedidosPropios } from '../services/orders-service'

export function useStorePedidos() {
  return useQuery({
    queryKey: ['store-pedidos'],
    queryFn: getPedidosPropios,
  })
}
