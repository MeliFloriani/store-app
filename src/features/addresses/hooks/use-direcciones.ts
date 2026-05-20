import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  actualizarDireccion,
  crearDireccion,
  eliminarDireccion,
  listarDirecciones,
  marcarComoPrincipal,
} from '../services/api'
import type { DireccionEntregaPayload } from '../types'

const DIRECCIONES_QUERY_KEY = ['store-direcciones']

export function useDirecciones() {
  return useQuery({
    queryKey: DIRECCIONES_QUERY_KEY,
    queryFn: listarDirecciones,
  })
}

export function useCrearDireccion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearDireccion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DIRECCIONES_QUERY_KEY })
    },
  })
}

export function useActualizarDireccion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: Partial<DireccionEntregaPayload>
    }) => actualizarDireccion(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DIRECCIONES_QUERY_KEY })
    },
  })
}

export function useEliminarDireccion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eliminarDireccion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DIRECCIONES_QUERY_KEY })
    },
  })
}

export function useMarcarPrincipal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: marcarComoPrincipal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DIRECCIONES_QUERY_KEY })
    },
  })
}
