import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorMessage from './components/ErrorMessage';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 900px; /* Slightly wider for better layout */
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Poppins', sans-serif;
  color: #ffffff; /* White text for consistency */
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 35px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    padding: 16px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 24px;
  color: #000000;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 28px;
    margin-bottom: 16px;
  }
`;

function App() {
  return (
    <WeatherProvider>
      <AppContainer>
        <Title>Weather Dashboard</Title>
        <SearchBar />
        <ErrorMessage />
        <WeatherDisplay />
        <ForecastDisplay />
      </AppContainer>
    </WeatherProvider>
  );
}

export default App;