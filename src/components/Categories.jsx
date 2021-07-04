import React, { useState } from 'react';

const Categories = React.memo(({ items, onClickItem }) => {
  const [activeItem, toggleItem] = useState(null);
  const onSelectItem = (index) => {
    toggleItem(index);
    onClickItem(index);
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
});

export default Categories;
