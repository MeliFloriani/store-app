import { AxiosError } from 'axios'

// No hay login visible en store-app: si no existe cookie CLIENT, se informa sin exponer manejo de tokens.
export const CLIENT_SESSION_REQUIRED_MESSAGE =
  'Para continuar se requiere una sesión de cliente. En esta entrega la tienda pública no incluye login visible; si ya tenés una cookie CLIENT válida, reintentá la acción.'

export const NETWORK_ERROR_MESSAGE =
  'No pudimos comunicarnos con el backend. Verificá que la API esté levantada y reintentá.'

export function isUnauthorizedError(error: unknown) {
  return error instanceof AxiosError && error.response?.status === 401
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocurrió un error inesperado. Reintentá en unos instantes.',
) {
  if (isUnauthorizedError(error)) {
    return CLIENT_SESSION_REQUIRED_MESSAGE
  }

  if (error instanceof AxiosError) {
    if (!error.response) {
      return NETWORK_ERROR_MESSAGE
    }

    const detail = error.response.data?.detail
    if (typeof detail === 'string') {
      return detail
    }
  }

  return error instanceof Error ? error.message : fallback
}
