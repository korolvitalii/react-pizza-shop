const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PIZZAS':
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case 'SET_LOADED':
      return {
        ...state,
        items: action.payload,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default cart;
