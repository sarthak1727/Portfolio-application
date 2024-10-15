// api.js
export const fetchPortfolios = async () => {
    try {
      const response = await fetch('https://mancuso.ai/wp-json/v1/portfolios');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      return [];
    }
  };