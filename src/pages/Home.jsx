import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { addPizzaToCart } from '../redux/actions/cart';
import { fetchPizzas } from '../redux/actions/pizzas';


const categoryNames = ['Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];
const sortItems = [
  { name: 'popularity', type: 'popular', order: 'desc' },
  { name: 'the price', type: 'price', order: 'desc' },
  { name: 'alphabet', type: 'name', order: 'asc' },
];

const Home = React.memo(() => {
  const dispatch = useDispatch();
  const { addedItems } = useSelector(({ cart }) => cart);
  const { items, filteredItems, isLoaded, category, sortBy } = useSelector(({ pizzas }) => pizzas);
  useEffect(() => {
    dispatch(fetchPizzas(category));
  }, [dispatch, sortBy, category]);

  const onSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onSelectSortType = (type) => {
    dispatch(setSortBy(type));
  };

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {isLoaded && filteredItems.length === 0
          ? items.map((item) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={item.id}
                addedCount={addedItems[item.id] && addedItems[item.id].items.length}
                {...item}
              />
            ))
          : filteredItems.map((item) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={item.id}
                addedCount={addedItems[item.id] && addedItems[item.id].items.length}
                {...item}
              />
            ))}
      </div>
    </div>
  );
});

export default Home;
