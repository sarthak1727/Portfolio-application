import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CategoryFilter from './components/CategoryFilter';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioDetail from './components/PortfolioDetail';
import { fetchPortfolios } from './api';
import './App.css';

const AppContent = ({ portfolios, categories, selectedCategory, setSelectedCategory }) => {
  const location = useLocation();

  const filteredPortfolios = selectedCategory === 'All'
    ? portfolios
    : portfolios.filter(item => item.categories.includes(selectedCategory));

  return (
    <div className="app">
      {location.pathname === '/' && (
        <>
          <h1>Portfolio</h1> 
          <hr className="custom-hr" /> 
          <div className="my-works-container"> 
            <h2 className="my-works-heading">My Works</h2> 
          </div>
          <div className="category-container"> 
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={
          <main>
            <PortfolioGrid portfolios={filteredPortfolios} />
          </main>
        } />
        <Route path="/portfolio/:id/:title" element={<PortfolioDetail portfolios={portfolios} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadPortfolios = async () => {
      const data = await fetchPortfolios();
      setPortfolios(data);

      const uniqueCategories = ['All', ...new Set(data.flatMap(item => item.categories))];
      setCategories(uniqueCategories);
    };

    loadPortfolios();
  }, []);

  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const data = await fetchPortfolios();
        setPortfolios(data);

        const uniqueCategories = ['All', ...new Set(data.flatMap(item => item.categories))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadPortfolios();
  }, []);


  return (
    <Router>
    {!loading ? (
      <AppContent
        portfolios={portfolios}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    ) : (
      <div className="loading"></div> 
    )}
  </Router>
  );
};

export default App;
