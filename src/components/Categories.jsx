import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(({ activeCategory, items, onClickCategory }) => {
  return (
    <div className='categories'>
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onClickCategory(null)}>
          All
        </li>
        {items.map((name, index) => (
          <li
            className={activeCategory === index ? 'active' : ''}
            key={`${name}_${index}`}
            onClick={() => onClickCategory(index)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
