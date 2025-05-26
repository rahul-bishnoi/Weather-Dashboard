import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || 'London');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    localStorage.setItem('lastCity', city);
  }, [city]);

  return (
    <WeatherContext.Provider value={{ city, setCity, unit, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};