import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WeatherContext } from '../context/WeatherContext';
import styled from 'styled-components';

const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05); /* Subtle transparent background */
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(5px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ForecastCard = styled.div`
  background: rgba(255, 255, 255, 0.15); /* Transparent card */
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  width: 18%;
  min-width: 140px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: #000000;
  font-family: 'Poppins', sans-serif;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const ForecastIcon = styled.img`
  width: 60px;
  margin: 8px auto;
`;

const LoadingMessage = styled.div`
  color: #000000;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  text-align: center;
  margin-top: 24px;
`;

function ForecastDisplay() {
  const { city, unit } = useContext(WeatherContext);
  const API_KEY = '9bd21195d01b7cfe67beafbfe4323885';

  const fetchForecast = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    // Filter to get one forecast per day (e.g., 12:00 PM)
    const dailyData = response.data.list.filter((reading) =>
      reading.dt_txt.includes('12:00:00')
    );
    return dailyData;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['forecast', city, unit],
    queryFn: fetchForecast,
    refetchInterval: 30000,
  });

  if (isLoading) return <LoadingMessage>Loading forecast...</LoadingMessage>;
  if (!data) return null;

  return (
    <ForecastContainer>
      {data.map((day) => (
        <ForecastCard key={day.dt}>
          <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <ForecastIcon
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p>{Math.round(day.main.temp)} {unit === 'metric' ? '°C' : '°F'}</p>
          <p>{day.weather[0].description}</p>
        </ForecastCard>
      ))}
    </ForecastContainer>
  );
}

export default ForecastDisplay;