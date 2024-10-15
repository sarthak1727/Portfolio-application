// components/PortfolioDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Assests/Css/PortfolioDetail.css';

const PortfolioDetail = ({ portfolios }) => {
  const { id } = useParams();
  const portfolio = portfolios.find(p => p.id === parseInt(id));

  if (!portfolio) return <div>Portfolio not found</div>;

  return (
    <div className="portfolio-detail">
      <Link to="/" className="back-button">← Back</Link>
      <h2>{portfolio.title}</h2>
      <img src={portfolio.featured_image} alt={portfolio.title} className="detail-image" />
      <div className="detail-content">
        <p><strong>Description:</strong></p>
        <div
          dangerouslySetInnerHTML={{
            __html: portfolio.post_meta.fw_options.portfolio_type.standard.pf_description
          }}
        />
      </div>
      {portfolio.clientLogo && (
        <img src={portfolio.clientLogo} alt={`${portfolio.title} client`} className="detail-logo" />
      )}
    </div>
  );
};

export default PortfolioDetail;
