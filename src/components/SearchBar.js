// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import countriesData from '../components/countriesData.json'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);

  // Update suggestions based on query
  useEffect(() => {
    if (query) {
      const filteredSuggestions = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.capital?.[0].toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, countries]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by country or capital..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((country) => (
            <li key={country.cca3} className="suggestion-item">
              {country.name.common} - {country.capital?.[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
