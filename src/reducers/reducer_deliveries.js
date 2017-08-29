const initialState = {
  deliveries: [],
  delivery: null
};

export default function reducerDeliveries(state = initialState, action) {
  switch(action.type) {
    case 'LIST_DELIVERIES': {
      return Object.assign({}, state, {deliveries: action.payload});
    }

    case 'NEW_DELIVERY': {
      return Object.assign({}, state, {delivery: {}});
    }

    case 'DELIVERY_SELECTED': {
      return Object.assign({}, state, {delivery: action.payload});
    }

    case 'DELIVERY_UNSELECTED': {
      return Object.assign({}, state, {delivery: ''});
    }

    case 'SAVE_DELIVERY': {
      const prevDeliveries = state.deliveries;
      const updatedDeliveries = [ ...prevDeliveries, action.payload ];
      return Object.assign({}, state, {deliveries: updatedDeliveries, delivery: ''});
    }

    case 'UPDATE_DELIVERY': {
      const updatedDeliveries = state.deliveries.map((delivery) => {
        if (delivery.id === action.payload.id) {
          return { ...delivery, ...action.payload};
        }
        return delivery;
      });
      return Object.assign({}, state, {deliveries: updatedDeliveries, delivery: ''});
    }

    case 'DELETE_DELIVERY': {
      const updatedDeliveries = state.deliveries.filter((delivery) => {
        if (delivery.id != action.payload.id)  {
          return delivery;
        }
      });
      return Object.assign({}, state, {deliveries: updatedDeliveries, delivery: ''});
    }

    default:
      return state;
  }
}
