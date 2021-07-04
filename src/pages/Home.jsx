import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];
const sortItems = [
  { name: 'popularity', type: 'popular' },
  { name: 'the price', type: 'price' },
  { name: 'alphabet', type: 'alfabet' },
];

const Home = React.memo(() => {
  const { items, isLoaded } = useSelector(({ pizzas }) => pizzas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchPizzas());
    }
  });

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories onClickItem={onSelectCategory} items={categoryNames} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {isLoaded && items.map((item) => <PizzaBlock key={item.id} {...item} />)}
        {Array(10).fill()}
      </div>
    </div>
  );
});

export default Home;
