import React from 'react';
import { Categories, SortPopup, PizzaBlock } from '../components';

function Home({ items }) {
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          onClickItem={(name) => console.log(name)}
          items={['Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed']}
        />
        <SortPopup
          items={[
            { name: 'popularity', type: 'popular' },
            { name: 'the price', type: 'price' },
            { name: 'alphabet', type: 'alfabet' },
          ]}
        />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {items.map((item) => (
          <PizzaBlock key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
