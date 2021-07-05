import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';

const categoryNames = ['Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];
const sortItems = [
  { name: 'popularity', type: 'popular' },
  { name: 'the price', type: 'price' },
  { name: 'alphabet', type: 'alfabet' },
];

const Home = React.memo(() => {
  const { items, isLoaded } = useSelector(({ pizzas }) => pizzas);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [category]);

  const onSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onSelectSortType = (type) => {
    dispatch(setSortBy(type));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup activeSortType={sortBy} items={sortItems} onClickSortType={onSelectSortType} />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {isLoaded
          ? items.map((item) => <PizzaBlock isLoading={true} key={item.id} {...item} />)
          : Array(12).fill(<LoadingBlock />)}
      </div>
    </div>
  );
});

export default Home;
