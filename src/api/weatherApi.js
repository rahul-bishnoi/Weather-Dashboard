// Add to existing weatherApi.js
export const fetchForecast = async (city, unit = 'metric') => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: {
        q: city,
        units: unit,
        appid: '9bd21195d01b7cfe67beafbfe4323885',
      },
    }
  );
  return response.data;
};