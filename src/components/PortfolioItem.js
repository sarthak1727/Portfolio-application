// components/PortfolioItem.js
import React from 'react';
import '../Assests/Css/PortfolioItem.css'

const PortfolioItem = ({ item }) => (
  <div className="portfolio-item">
    <img src={item.featured_image} alt={item.title} />
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
);

export default PortfolioItem;