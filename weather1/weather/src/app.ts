import express from 'express';
import nodemailer from 'nodemailer';
import { getCoordinates, getWeather, saveCityWeather } from './service';
import CityWeather from './model';
import credentials from './credentials';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/SaveWeatherMapping', async (req, res) => {
  try {
    const cities = req.body;
    for (const cityData of cities) {
      const { city, country } = cityData;
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const { latitude, longitude } = coordinates;
        const weather = await getWeather(latitude, longitude);
        if (weather !== null) {
          await saveCityWeather(city, country, weather, longitude, latitude);
        }
      }
    }
    res.send("Data saved successfully");
  } catch (error) {
    console.log("Error processing request");
    res.send('Internal server error');
  }
});

app.get('/cityWeather/:city?', async (req, res) => {
  try {
    const { city } = req.params;
    const attributes = ['id', 'city', 'country', 'time', 'weather']; // attributes

    let cityWeatherRecords;
    if (city) {
      cityWeatherRecords = await CityWeather.findOne({
        where: { city },
        attributes
      });
      console.log("Details for city");
    } else {
      cityWeatherRecords = await CityWeather.findAll({
        attributes
      });
      console.log("All cities details");
    }

    res.send(cityWeatherRecords);
  } catch (error) {
    console.error("Error getting city weather records:", error);
    res.send('Internal server error');
  }
});

app.get('/nodemailer/:city?', async (req, res) => {
  try {
    const { city } = req.params;
    let cityWeatherRecords;
    if (city) {
      cityWeatherRecords = await CityWeather.findOne({
        where: { city },
        attributes: ['city', 'country', 'time', 'weather']
      });
      if (!cityWeatherRecords) {
        return res.status(404).send('City not found');
      }
      cityWeatherRecords = [cityWeatherRecords]; // Convert to array
    } else {
      cityWeatherRecords = await CityWeather.findAll({
        attributes: ['city', 'country', 'time', 'weather']
      });
    }

    const htmlTable = generateHtmlTable(cityWeatherRecords.filter(record => record !== null) as CityWeather[]);

    let transporter = nodemailer.createTransport({
      service: 'gmail.com',
      auth: {
        user: credentials.username,
        pass: credentials.password,
      },
    });

    let info = await transporter.sendMail({
      from: 'venkatesh.podili2001@gmail.com',
      to: 'venkatesh.podili2000@gmail.com',
      subject: 'Weather Report',
      html: htmlTable,
    });

    console.log("Message sent:", info.messageId);
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal server error');
  }
});

function generateHtmlTable(data: CityWeather[]): string {
  let html = '<table border="1"><tr>';
  html += '<th>City</th><th>Country</th><th>Time</th><th>Weather</th>';
  html += '</tr>';
  data.forEach((item) => {
    html += `<tr><td>${item.city}</td><td>${item.country}</td><td>${item.time}</td><td>${item.weather}</td></tr>`;
  });
  html += '</table>';
  return html;
}


app.listen(port, () => {
  console.log("Server is running  ");
});

