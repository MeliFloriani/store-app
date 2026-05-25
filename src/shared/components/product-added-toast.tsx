type ProductAddedToastProps = {
  visible: boolean
}

export function ProductAddedToast({ visible }: ProductAddedToastProps) {
  if (!visible) {
    return null
  }

  return (
    <div
      aria-live="polite"
      className="fixed right-4 top-20 z-50 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg"
      role="status"
    >
      Producto agregado al carrito
    </div>
  )
}
