import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setPizzas } from './redux/actions/pizzas';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3001/pizzas').then(({ data }) => dispatch(setPizzas(data)));
  });

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Route path='/' component={Home} exact />
        <Route path='/cart' component={Cart} exact />
      </div>
    </div>
  );
};

export default App;
