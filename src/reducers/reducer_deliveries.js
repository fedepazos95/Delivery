const initialState = {
  deliveries: [],
  delivery: null
};

export default function reducerDeliveries(state = initialState, action) {
  switch (action.type) {
    case 'LIST_DELIVERIES': {
      return {
        ...state,
        deliveries: action.payload
      };
    }

    case 'NEW_DELIVERY': {
      return {
        ...state,
        delivery: {}
      };
    }

    case 'DELIVERY_SELECTED': {
      return {
        ...state,
        delivery: action.payload
      };
    }

    case 'DELIVERY_UNSELECTED': {
      return {
        ...state,
        delivery: ''
      };
    }

    case 'SAVE_DELIVERY': {
      return {
        ...state,
        deliveries: [...state.deliveries, action.payload],
        delivery: ''
      };
    }

    case 'UPDATE_DELIVERY': {
      return {
        ...state,
        deliveries: state.deliveries.map(delivery => {
          if (delivery.id === action.payload.id) {
            return { ...delivery, ...action.payload };
          }
          return delivery;
        }),
        delivery: ''
      };
    }

    case 'DELETE_DELIVERY': {
      return {
        ...state,
        deliveries: state.deliveries.filter(del => del.id != action.payload.id),
        delivery: ''
      };
    }

    default:
      return state;
  }
}
