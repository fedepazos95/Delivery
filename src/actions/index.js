// Data para iniciar la app con info
const deliveries = [
  {
    id: 1,
    nombre: "Argentino",
    descripcion: "Argentino casa de comidas",
    especialidades: "Pizzas y empanadas",
    direccion: "Calle 20",
    horarioInicio: 9,
    horarioFin: 23,
    telefono: "48196084",
    admNombre: "Juan",
    admApellido: "Perez",
    admTelefono: "1550809440",
    admEmail: "juan.perez@gmail.com",
    cmNombre: "Raul",
    cmApellido: "Gonzalez",
    cmTelefono: "1590846517",
    cmEmail: "raul.gonzalez@hotmail.com"
  },
  {
    id: 2,
    nombre: "Bar BQ",
    descripcion: "Bar BQ bebidas y tragos",
    especialidades: "Coctails y bebidas",
    direccion: "Calle 524",
    horarioInicio: 7,
    horarioFin: 20,
    telefono: "40849562",
    admNombre: "Juan",
    admApellido: "Perez",
    admTelefono: "1550809440",
    admEmail: "juan.perez@gmail.com",
    cmNombre: "Raul",
    cmApellido: "Gonzalez",
    cmTelefono: "1590846517",
    cmEmail: "raul.gonzalez@hotmail.com"
  }
];

export const listDeliveries = () => {
  return {
    type: 'LIST_DELIVERIES',
    payload: deliveries
  };
}

export const selectDelivery = (delivery) => {
  return {
    type: 'DELIVERY_SELECTED',
    payload: delivery
  };
}

export const unselectDelivery = () => {
  return {
    type: 'DELIVERY_UNSELECTED',
    payload: {}
  };
}

export const newDelivery = () => {
  return {
    type: 'NEW_DELIVERY',
    payload: {}
  };
}

export const saveDelivery = (delivery) => {
  // Asigna un ID aleatorio simulando el ingreso de registros nuevos a una base de datos
  delivery['id'] = Math.floor((Math.random() * 1000) + 1);
  return {
    type: 'SAVE_DELIVERY',
    payload: delivery
  };
}

export const updateDelivery = (delivery) => {
  return {
    type: 'UPDATE_DELIVERY',
    payload: delivery
  };
}

export const deleteDelivery = (delivery) => {
  return {
    type: 'DELETE_DELIVERY',
    payload: delivery
  };
}
