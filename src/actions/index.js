const deliveries = [
  {
    id: 1,
    name: "Argentino",
    description: "Argentino casa de comidas",
    specialties: "Pizzas y empanadas",
    direction: "Calle 20",
    startTime: 9,
    endTime: 23,
    phone: "48196084",
    admName: "Juan",
    admSurname: "Perez",
    admPhone: "1550809440",
    admEmail: "juan.perez@gmail.com",
    cmName: "Raul",
    cmSurname: "Gonzalez",
    cmPhone: "1590846517",
    cmEmail: "raul.gonzalez@hotmail.com"
  },
  {
    id: 2,
    name: "Bar BQ",
    description: "Bar BQ bebidas y tragos",
    specialties: "Coctails y bebidas",
    direction: "Calle 524",
    startTime: 7,
    endTime: 20,
    phone: "40849562",
    admName: "Juan",
    admSurname: "Perez",
    admPhone: "1550809440",
    admEmail: "juan.perez@gmail.com",
    cmName: "Raul",
    cmSurname: "Gonzalez",
    cmPhone: "1590846517",
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
  // Assign a random ID simulating the entry of new records into a database
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
