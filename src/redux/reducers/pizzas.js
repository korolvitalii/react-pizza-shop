import { sortBy, orderBy } from 'lodash';

const initialState = {
  items: [],
  filteredItems: [],
  isLoaded: false,
  sortBy: { type: 'popular', order: 'desc' },
  category: null,
};

const pizzas = (state = initialState, action) => {
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
    case 'SET_CATEGORY': {
      const filteredPizzas = state.items.filter((pizza) => pizza.category === action.payload);
      return {
        ...state,
        category: action.payload,
        filteredItems: filteredPizzas,
      };
    }
    case 'SET_SORT_BY': {
      console.log(action.payload.type);
      const func = {
        popular: orderBy(state.items, ['rating'], ['desc']),
        price: state.items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)),
        name: sortBy(state.items, 'name'),
      };
      let filteredPizzas = func[action.payload.type];
      console.log(filteredPizzas);
      return {
        ...state,
        filteredItems: filteredPizzas,
        sortBy: action.payload,
      };
    }
    default:
      return state;
  }
};

export default pizzas;
