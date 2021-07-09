const initialState = {
  addedItems: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART':
      const newaddedItems = {
        ...state.addedItems,
        [action.payload.id]: !state.addedItems[action.payload.id]
          ? [action.payload]
          : [...state.addedItems[action.payload.id], action.payload],
      };
      const allPizzas = Object.values(newaddedItems).flat();
      const calculateTotalPrice = allPizzas.reduce((acc, { price }) => acc + price, 0);
      return {
        ...state,
        addedItems: newaddedItems,
        totalCount: allPizzas.length,
        totalPrice: Math.round(calculateTotalPrice * 100) / 100,
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      };
    default:
      return state;
  }
};

export default cart;
