import React, { useContext, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent white */
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(8px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #000000;
  width: 60%;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: #74ebd5;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(116, 235, 213, 0.5);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, #66d9c3, #9aa8d7);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const UnitToggle = styled.button`
  padding: 12px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: rgba(40, 167, 69, 0.2); /* Green with transparency */
  color: #000000;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(40, 167, 69, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function SearchBar() {
  const { city, setCity, unit, setUnit } = useContext(WeatherContext);
  const [input, setInput] = useState(city);

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city name"
      />
      <Button onClick={handleSearch}>Search</Button>
      <UnitToggle onClick={toggleUnit}>
        {unit === 'metric' ? '°F' : '°C'}
      </UnitToggle>
    </SearchContainer>
  );
}

export default SearchBar;