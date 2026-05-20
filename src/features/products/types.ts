export type Producto = {
  id: number
  nombre: string
  descripcion?: string | null
  precio_base: number
  imagenes_url?: string | null
  tiempo_prep_min?: number | null
  stock_cantidad: number
  disponible: boolean
  created_at?: string
  updated_at?: string
  categoria_ids?: number[]
  ingredientes?: ProductoIngrediente[]
}

export type ProductoIngrediente = {
  id: number
  nombre: string
  es_alergeno: boolean
  es_removible?: boolean
}

export type ProductosParams = {
  skip?: number
  limit?: number
  search?: string
  categoria_id?: number
  disponible?: boolean
}
