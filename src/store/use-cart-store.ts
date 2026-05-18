import { create } from 'zustand'

type CartStore = {
  items: number
  addItem: () => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: 0,

  addItem: () =>
    set((state) => ({
      items: state.items + 1,
    })),

  clearCart: () =>
    set({
      items: 0,
    }),
}))