const initialState = {
  sortBy: { type: 'popular', order: 'desc' },
  category: null,
  items: [],
};
const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PIZZAS': {
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default filters;
