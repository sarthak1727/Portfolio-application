// components/PortfolioCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Assests/Css/PortfolioCard.css';

const PortfolioCard = ({ item }) => (
  <Link to={`/portfolio/${item.id}`} className="portfolio-card">
    <div className="image-wrapper">
      <img src={item.featured_image} alt={`${item.title} cover`} className="portfolio-card-image" />
      <div className="title-overlay">
        <h3 className="portfolio-card-title">{item.title}</h3>
      </div>
    </div>
  </Link>
);

export default PortfolioCard;