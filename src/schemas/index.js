export const getDeliverySchema = () => {
  return {
    nombre: '',
    telefono: '',
    descripcion: '',
    especialidades: '',
    direccion: '',
    horarioInicio: '',
    horarioFin: '',
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
  // Si es un campo requerido se inicializa en false.
  return {
    nombre: false,
    telefono: false,
    descripcion: false,
    especialidades: true,
    direccion: false,
    horarioInicio: false,
    horarioFin: false,
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
  // Permite configurar los limites de caracteres de forma global.
  return {
    nombre: 50,
    telefono: 50,
    descripcion: 1000,
    especialidades: 500,
    direccion: 200,
    horarioInicio: 24,
    horarioFin: 24,
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
