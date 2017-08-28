export const getDeliverySchema = () => {
  return {
    nombre: '',
    telefono: '',
    descripcion: '',
    especialidades: '',
    direccion: '',
    admNombre: '',
    admApellido: '',
    admTelefono: '',
    admEmail: '',
    cmNombre: '',
    cmApellido: '',
    cmTelefono: '',
    cmEmail: ''
  }
}

export const getValidDeliverySchema = () => {
  return {
    nombre: false,
    telefono: false,
    descripcion: false,
    direccion: false,
    admNombre: false,
    admApellido: false,
    admTelefono: false,
    admEmail: false,
    cmNombre: false,
    cmApellido: false,
    cmTelefono: false,
    cmEmail: false
  }
}

export const getInputsRestrictions = () => {
  return {
    nombre: 50,
    telefono: 50,
    descripcion: 1000,
    especialidades: 500,
    direccion: 200,
    admNombre: 200,
    admApellido: 200,
    admTelefono: 100,
    admEmail: 100,
    cmNombre: 200,
    cmApellido: 200,
    cmTelefono: 100,
    cmEmail: 100
  }
}
