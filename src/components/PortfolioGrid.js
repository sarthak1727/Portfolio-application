import React from 'react';
import PortfolioCard from './PortfolioCard';
import '../Assests/Css/PortfolioGrid.css';

const PortfolioGrid = ({ portfolios }) => (
  <div className="portfolio-grid">
    {portfolios.map(item => (
      <PortfolioCard key={item.id} item={item} />
    ))}
  </div>
);

export default PortfolioGrid;