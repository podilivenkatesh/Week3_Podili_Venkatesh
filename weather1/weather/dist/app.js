"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const service_1 = require("./service");
const model_1 = __importDefault(require("./model"));
const credentials_1 = __importDefault(require("./credentials"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = req.body;
        for (const cityData of cities) {
            const { city, country } = cityData;
            const coordinates = yield (0, service_1.getCoordinates)(city);
            if (coordinates) {
                const { latitude, longitude } = coordinates;
                const weather = yield (0, service_1.getWeather)(latitude, longitude);
                if (weather !== null) {
                    yield (0, service_1.saveCityWeather)(city, country, weather, longitude, latitude);
                }
            }
        }
        res.send("Data saved successfully");
    }
    catch (error) {
        console.log("Error processing request");
        res.send('Internal server error');
    }
}));
app.get('/cityWeather/:city?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.params;
        const attributes = ['id', 'city', 'country', 'time', 'weather']; // attributes
        let cityWeatherRecords;
        if (city) {
            cityWeatherRecords = yield model_1.default.findOne({
                where: { city },
                attributes
            });
            console.log("Details for city");
        }
        else {
            cityWeatherRecords = yield model_1.default.findAll({
                attributes
            });
            console.log("All cities details");
        }
        res.send(cityWeatherRecords);
    }
    catch (error) {
        console.error("Error fetching city weather records:", error);
        res.send('Internal server error');
    }
}));
app.get('/nodemailer/:city?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.params;
        let cityWeatherRecords;
        if (city) {
            cityWeatherRecords = yield model_1.default.findOne({
                where: { city },
                attributes: ['city', 'country', 'time', 'weather']
            });
            if (!cityWeatherRecords) {
                return res.status(404).send('City not found');
            }
            cityWeatherRecords = [cityWeatherRecords]; // Convert to array
        }
        else {
            cityWeatherRecords = yield model_1.default.findAll({
                attributes: ['city', 'country', 'time', 'weather']
            });
        }
        const htmlTable = generateHtmlTable(cityWeatherRecords.filter(record => record !== null));
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail.com',
            auth: {
                user: credentials_1.default.username,
                pass: credentials_1.default.password,
            },
        });
        let info = yield transporter.sendMail({
            from: 'venkatesh.podili2001@gmail.com',
            to: 'venkatesh.podili2000@gmail.com',
            subject: 'Weather Report',
            html: htmlTable,
        });
        console.log("Message sent:", info.messageId);
        res.send('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal server error');
    }
}));
function generateHtmlTable(data) {
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
//# sourceMappingURL=app.js.map