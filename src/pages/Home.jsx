import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory } from '../redux/actions/filters';

const categoryNames = ['Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];
const sortItems = [
  { name: 'popularity', type: 'popular' },
  { name: 'the price', type: 'price' },
  { name: 'alphabet', type: 'alfabet' },
];

const Home = React.memo(() => {
  const { items } = useSelector(({ pizzas }) => pizzas);
  const dispatch = useDispatch();

  const onSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  console.log(items);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories onClickItem={onSelectCategory} items={categoryNames} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {items && items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
});

export default Home;
