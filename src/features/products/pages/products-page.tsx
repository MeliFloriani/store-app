import { useCartStore } from '../../../store/use-cart-store'

export function ProductsPage() {
  const { items, addItem, clearCart } =
    useCartStore()

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">
        Store App
      </h1>

      <p>
        Items in cart: {items}
      </p>

      <div className="flex gap-2">
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>

        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}