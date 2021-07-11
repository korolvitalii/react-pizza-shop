import { isObject, get, omit } from 'lodash';

const initialState = {
  addedItems: {},
  totalPrice: 0,
  totalCount: 0,
};

const totalSum = (items, path) => {
  if (!Array.isArray(items)) {
    const keys = Object.keys(items);
    return keys.reduce((acc, key) => acc + get(items[key], path), 0);
  } else {
    return items.reduce((acc, { price }) => acc + price, 0);
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART':
      console.log(state.addedItems);

      const currentPizzaItems = !state.addedItems[action.payload.id]
        ? [action.payload]
        : [...state.addedItems[action.payload.id].items, action.payload];
      const newAddedItems = {
        ...state.addedItems,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: totalSum(currentPizzaItems),
        },
      };
      return {
        ...state,
        addedItems: newAddedItems,
        totalCount: 0,
        totalPrice: totalSum(newAddedItems, 'totalPrice'),
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      };
    case 'CLEAR_CART':
      return {
        addedItems: {},
        totalPrice: 0,
        totalCount: 0,
      };
    case 'REMOVE_CART_ITEM':
      const newItems = omit(state.addedItems, [`${action.payload}`]);
      return {
        ...state,
        addedItems: newItems,
        totalPrice: 0,
        totalCount: 0,
      };
    default:
      return state;
  }
};

export default cart;
