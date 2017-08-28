export default function (state = null, action) {
  switch (action.type) {
    case 'DELIVERY_SELECTED':
      return action.payload
    case 'NEW_DELIVERY':
      return action.payload
    case 'SAVE_DELIVERY':
      return action.payload
  }

  return state
}
