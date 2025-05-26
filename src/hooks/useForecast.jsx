// src/hooks/useForecast.js
import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../api/weatherApi';

export const useForecast = (city, unit) => {
  return useQuery(['forecast', city, unit], () => fetchForecast(city, unit), {
    enabled: !!city,
    refetchInterval: 30000,
  });
};