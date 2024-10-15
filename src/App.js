// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioDetail from './components/PortfolioDetail';
import { fetchPortfolios } from './api';
import './App.css';

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

  const filteredPortfolios = selectedCategory === 'All'
    ? portfolios
    : portfolios.filter(item => item.categories.includes(selectedCategory));

  return (
    <Router>
      <div className="app">
        <h1>Portfolio</h1> {/* Portfolio heading */}
        <hr /> {/* Horizontal line */}
        <Header />
        <div className="category-container"> {/* Wrapper for right alignment */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <Routes>
          <Route path="/" element={
            <main>
              <PortfolioGrid portfolios={filteredPortfolios} />
            </main>
          } />
          <Route path="/portfolio/:id" element={<PortfolioDetail portfolios={portfolios} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;