import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProductSnapshot = {
  id: number
  nombre: string
  descripcion?: string | null
  precio_base: number
  imagenes_url?: string | null
  disponible: boolean
}

export type CartItem = {
  productoId: number
  nombre: string
  precioUnitario: number
  imagenUrl?: string | null
  cantidad: number
}

type CartStore = {
  items: CartItem[]
  totalItems: () => number
  subtotal: () => number
  addProduct: (producto: CartProductSnapshot, cantidad?: number) => void
  updateQuantity: (productoId: number, cantidad: number) => void
  removeItem: (productoId: number) => void
  clearCart: () => void
}

const toMoney = (value: number) => Number(value.toFixed(2))

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      totalItems: () =>
        get().items.reduce((total, item) => total + item.cantidad, 0),

      subtotal: () =>
        toMoney(
          get().items.reduce(
            (total, item) => total + item.precioUnitario * item.cantidad,
            0,
          ),
        ),

      addProduct: (producto, cantidad = 1) =>
        set((state) => {
          const current = state.items.find(
            (item) => item.productoId === producto.id,
          )

          if (current) {
            return {
              items: state.items.map((item) =>
                item.productoId === producto.id
                  ? { ...item, cantidad: item.cantidad + cantidad }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                productoId: producto.id,
                nombre: producto.nombre,
                precioUnitario: Number(producto.precio_base),
                imagenUrl: producto.imagenes_url,
                cantidad,
              },
            ],
          }
        }),

      updateQuantity: (productoId, cantidad) =>
        set((state) => ({
          items:
            cantidad <= 0
              ? state.items.filter((item) => item.productoId !== productoId)
              : state.items.map((item) =>
                  item.productoId === productoId ? { ...item, cantidad } : item,
                ),
        })),

      removeItem: (productoId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productoId !== productoId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'foodstore-store-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
