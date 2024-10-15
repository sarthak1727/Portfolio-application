import React from 'react';
import '../Assests/Css/CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="category-filter">
    {categories.map(category => (
      <button
        key={category}
        className={selectedCategory === category ? 'active' : ''}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;