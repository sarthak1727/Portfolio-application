import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Assests/Css/PortfolioDetail.css';

const PortfolioDetail = ({ portfolios }) => {
    const { id } = useParams();
    const portfolio = portfolios.find(p => p.id === parseInt(id));
    if (!portfolio) return <div>Portfolio not found</div>;

    const currentIndex = portfolios.findIndex(p => p.id === parseInt(id));
    const prevPortfolio = portfolios[currentIndex - 1];
    const nextPortfolio = portfolios[currentIndex + 1];

    return (
        <div className="portfolio-detail">
            <div className="navigation-buttons">
                <Link to="/" className="back-button">Close</Link>
                <div className="nav-right">
                    {prevPortfolio && (
                        <Link
                            to={`/portfolio/${prevPortfolio.id}/${encodeURIComponent(prevPortfolio.title)}`}
                            className="prev-button"
                        >
                            ← Previous
                        </Link>
                    )}
                    {nextPortfolio && (
                        <Link
                            to={`/portfolio/${nextPortfolio.id}/${encodeURIComponent(nextPortfolio.title)}`}
                            className="next-button"
                        >
                            Next →
                        </Link>
                    )}
                </div>
            </div>

            <h2 className="portfolio-title">{portfolio.title}</h2>

            <div className="detail-container">
                <div className="detail-text">
                    <div className="detail-content">
                        <p><strong>Description:</strong></p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: portfolio.post_meta.fw_options.portfolio_type.standard.pf_description
                            }}
                        />
                    </div>
                </div>

                <div className="detail-image-container">
                    <img src={portfolio.featured_image} alt={portfolio.title} className="detail-image" />
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;