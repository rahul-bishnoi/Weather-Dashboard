import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeatherContext } from '../context/WeatherContext';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background: rgba(255, 255, 255, 0.15); 
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
  color: #000000; 
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px); 
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    margin: 10px;
    padding: 12px;
    font-size: 14px;
  }
`;

function ErrorMessage() {
  const { city, unit } = useContext(WeatherContext);
  const API_KEY = '9bd21195d01b7cfe67beafbfe4323885';

  const { error } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('City not found or network error');
      return response.json();
    },
    refetchInterval: 30000,
    retry: 2,
  });

  if (!error) return null;

  return <ErrorContainer>Error: {error.message}</ErrorContainer>;
}

export default ErrorMessage;