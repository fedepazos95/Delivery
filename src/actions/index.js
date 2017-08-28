// Data
const deliveries = [
  {
    nombre: "Argentino",
    descripcion: "Argentino casa de comidas",
    especialidades: "Pizzas y empanadas",
    direccion: "Calle 20",
    horario: "",
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
    nombre: "Bar BQ",
    descripcion: "Bar BQ bebidas y tragos",
    especialidades: "Coctails y bebidas",
    direccion: "Calle 524",
    horario: "",
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
  }
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
  }
}

export const saveDelivery = (delivery) => {
  console.log('save', delivery);
  return {
    type: 'SAVE_DELIVERY',
    payload: delivery
  }
}
