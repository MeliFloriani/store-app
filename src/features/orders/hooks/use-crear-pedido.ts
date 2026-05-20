import { useMutation, useQueryClient } from '@tanstack/react-query'

import { crearPedido } from '../services/orders-service'

export function useCrearPedido() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearPedido,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['store-pedidos'] })
    },
  })
}
