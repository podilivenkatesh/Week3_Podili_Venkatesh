import axios from 'axios';
import CityWeather from './model';

async function getCoordinates(city: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
      headers: {
        'X-Api-Key': '0UC43N6w8hVKR5g79MSAow==NnpBJEpY6oltkMXO',
      },
    });
    const data = response.data;
    if (Array.isArray(data) && data.length > 0) {
      const { latitude, longitude } = data[0];
      return { latitude, longitude };
    } else {
      console.error('No coordinates found for the city:', city);
      return null;
    }
  } catch (error) {
    console.error('Error coordinates:', error);
    return null;
  }
}

async function getWeather(latitude: number, longitude: number): Promise<number | null> {
  try {
    const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, {
      headers: {
        'x-rapidapi-key': 'eccbcb306amsh5b803cdcd2bde03p1299aajsnce9260606dd4',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    });
    const data = response.data;
    const temperature = data.current.temp_c;
    return temperature;
  } catch (error) {
    console.error('Error getting  weather:', error);
    return null;
  }
}

async function saveCityWeather(city: string, country: string, weather: number, longitude: number, latitude: number): Promise<void> {
  try {
    await CityWeather.create({
      city,
      country,
      weather,
      time: new Date(),
      longitude,
      latitude,
    });
    console.log('City weather saved successfully');
  } catch (error) {
    console.error('Error saving city weather:', error);
  }
}





export { getCoordinates, getWeather, saveCityWeather };












