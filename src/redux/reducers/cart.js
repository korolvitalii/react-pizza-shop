import { get, omit } from 'lodash';

const initialState = {
  addedItems: {},
  totalPrice: 0,
  totalCount: 0,
};

const totalSum = (items, path) => {
  if (!Array.isArray(items)) {
    const sum = Object.keys(items).reduce((acc, key) => acc + get(items[key], path), 0);
    return Math.round(sum * 100) / 100;
  } else {
    const sum = items.reduce((acc, item) => acc + item[path], 0);
    return Math.round(sum * 100) / 100;
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.addedItems[action.payload.id]
        ? [action.payload]
        : [...state.addedItems[action.payload.id].items, action.payload];
      const newItems = {
        ...state.addedItems,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: totalSum(currentPizzaItems, 'price'),
        },
      };
      return {
        ...state,
        addedItems: newItems,
        totalCount: totalSum(newItems, 'items.length'),
        totalPrice: totalSum(newItems, 'totalPrice'),
      };
    }
    case 'SET_TOTAL_COUNT': {
      return {
        ...state,
        totalCount: action.payload,
      };
    }
    case 'CLEAR_CART': {
      return {
        addedItems: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }
    case 'REMOVE_CART_ITEM': {
      const newItems = omit(state.addedItems, [`${action.payload}`]);
      return {
        ...state,
        addedItems: newItems,
        totalCount: totalSum(newItems, 'items.length'),
        totalPrice: totalSum(newItems, 'totalPrice'),
      };
    }
    case 'PLUS_CART_ITEM': {
      const currentItem = state.addedItems[action.payload].items[0];
      const currentPizzaItems = [...state.addedItems[action.payload].items, currentItem];
      const newItems = {
        ...state.addedItems,
        [action.payload]: {
          items: currentPizzaItems,
          totalPrice: totalSum(currentPizzaItems, 'price'),
        },
      };
      return {
        ...state,
        addedItems: newItems,
        totalCount: totalSum(newItems, 'items.length'),
        totalPrice: totalSum(newItems, 'totalPrice'),
      };
    }
    case 'MINUS_CART_ITEM': {
      const currentPizzaItems = state.addedItems[action.payload].items.filter(
        (item, index) => index !== 1,
      );
      const newItems = {
        ...state.addedItems,
        [action.payload]: {
          items: currentPizzaItems,
          totalPrice: totalSum(currentPizzaItems, 'price'),
        },
      };
      return {
        ...state,
        addedItems: newItems,
        totalCount: totalSum(newItems, 'items.length'),
        totalPrice: totalSum(newItems, 'totalPrice'),
      };
    }
    default:
      return state;
  }
};

export default cart;
