export type DireccionEntrega = {
  id: number
  usuario_id: number
  alias?: string | null
  etiqueta?: string | null
  linea1: string
  linea2?: string | null
  ciudad: string
  provincia?: string | null
  codigo_postal?: string | null
  latitud?: string | number | null
  longitud?: string | number | null
  es_principal: boolean
  created_at: string
  updated_at: string
}

export type DireccionFormData = {
  alias: string
  calle: string
  numero: string
  piso: string
  localidad: string
  provincia: string
  codigoPostal: string
  pais: string
  telefono: string
  esPrincipal: boolean
}

export type DireccionEntregaPayload = {
  alias?: string | null
  etiqueta?: string | null
  linea1: string
  linea2?: string | null
  ciudad: string
  provincia?: string | null
  codigo_postal?: string | null
  es_principal: boolean
}

export function buildDireccionPayload(
  data: DireccionFormData,
): DireccionEntregaPayload {
  const linea1 = `${data.calle.trim()} ${data.numero.trim()}`.trim()
  const extras = [
    data.piso.trim() ? `Piso/Depto: ${data.piso.trim()}` : null,
    data.pais.trim() ? `País: ${data.pais.trim()}` : null,
    data.telefono.trim() ? `Tel: ${data.telefono.trim()}` : null,
  ].filter(Boolean)

  return {
    alias: data.alias.trim() || null,
    etiqueta: data.telefono.trim() || null,
    linea1,
    linea2: extras.length > 0 ? extras.join(' · ') : null,
    ciudad: data.localidad.trim(),
    provincia: data.provincia.trim() || null,
    codigo_postal: data.codigoPostal.trim() || null,
    es_principal: data.esPrincipal,
  }
}

export function getDireccionCompleta(direccion: DireccionEntrega) {
  return [
    direccion.linea1,
    direccion.linea2,
    direccion.ciudad,
    direccion.provincia,
    direccion.codigo_postal,
  ]
    .filter(Boolean)
    .join(', ')
}

export function direccionToFormData(
  direccion?: DireccionEntrega | null,
): DireccionFormData {
  if (!direccion) {
    return {
      alias: '',
      calle: '',
      numero: '',
      piso: '',
      localidad: '',
      provincia: '',
      codigoPostal: '',
      pais: 'Argentina',
      telefono: '',
      esPrincipal: false,
    }
  }

  const [calle = '', ...numeroParts] = direccion.linea1.split(' ')

  return {
    alias: direccion.alias ?? '',
    calle,
    numero: numeroParts.join(' '),
    piso: direccion.linea2 ?? '',
    localidad: direccion.ciudad,
    provincia: direccion.provincia ?? '',
    codigoPostal: direccion.codigo_postal ?? '',
    pais: 'Argentina',
    telefono: direccion.etiqueta ?? '',
    esPrincipal: direccion.es_principal,
  }
}
