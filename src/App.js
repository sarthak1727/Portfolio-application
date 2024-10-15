import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioDetail from './components/PortfolioDetail';
import { fetchPortfolios } from './api';
import './App.css';

// Component to conditionally render the header and category filter
const AppContent = ({ portfolios, categories, selectedCategory, setSelectedCategory }) => {
  const location = useLocation();

  const filteredPortfolios = selectedCategory === 'All'
    ? portfolios
    : portfolios.filter(item => item.categories.includes(selectedCategory));

  return (
    <div className="app">
      {location.pathname === '/' && ( // Only show this section on the home page
        <>
          <h1>Portfolio</h1> {/* Portfolio heading */}
          <hr className="custom-hr" /> {/* Horizontal line */}
          <div className="my-works-container"> {/* Container to align My Works to the right */}
            <h2 className="my-works-heading">My Works</h2> {/* My Works heading */}
          </div>
          <div className="category-container"> {/* Wrapper for right alignment */}
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
        <Route path="/portfolio/:id" element={<PortfolioDetail portfolios={portfolios} />} />
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

  return (
    <Router>
      <Header />
      <AppContent
        portfolios={portfolios}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Router>
  );
};

export default App;
