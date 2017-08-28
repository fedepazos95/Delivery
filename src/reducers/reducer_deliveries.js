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

    default:
      return state;
  }
}
