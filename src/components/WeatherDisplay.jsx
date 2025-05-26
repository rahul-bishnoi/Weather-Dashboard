import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WeatherContext } from '../context/WeatherContext';
import styled from 'styled-components';

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent background */
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #000000; /* White text for consistency */
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  max-width: 400px; /* Limit width for better layout */
  margin: 0 auto;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  h2 {
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    padding: 16px;
    max-width: 90%;
  }
`;

const WeatherIcon = styled.img`
  width: 120px;
  margin: 10px auto;
`;

const WeatherInfo = styled.div`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;

  p {
    margin: 8px 0;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const LoadingMessage = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  color: #000000;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

function WeatherDisplay() {
  const { city, unit } = useContext(WeatherContext);
  const API_KEY = '845d6ea6f348b9e608b13810b015170a';

  const fetchWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: fetchWeather,
    refetchInterval: 30000, // Poll every 30 seconds
    retry: 2,
  });

  if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return null; // Error is handled by ErrorMessage component
  if (!data || !data.main) return <LoadingMessage>No weather data available</LoadingMessage>;

  const temp = Math.round(data.main.temp);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <WeatherCard>
      <h2>{data.name}</h2>
      <WeatherIcon
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <WeatherInfo>
        <p>Temperature: {temp} {unitSymbol}</p>
        <p>Condition: {data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
      </WeatherInfo>
    </WeatherCard>
  );
}

export default WeatherDisplay;