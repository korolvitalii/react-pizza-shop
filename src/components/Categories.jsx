import React, { useState } from 'react';

export default function Categories({ items, onClickItem }) {
  const [activeItem, toggleItem] = useState(null);
  const onSelectItem = (index) => {
    toggleItem(index);
  };
  return (
    <div className='categories'>
      <ul>
        <li className={activeItem === null ? 'active' : ''} onClick={() => onSelectItem(null)}>
          All
        </li>
        {items.map((name, index) => (
          <li
            className={activeItem === index ? 'active' : ''}
            key={`${name}_${index}`}
            onClick={() => onSelectItem(index)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
