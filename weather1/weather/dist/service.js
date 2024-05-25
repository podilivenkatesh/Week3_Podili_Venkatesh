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
exports.saveCityWeather = exports.getWeather = exports.getCoordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const model_1 = __importDefault(require("./model"));
function getCoordinates(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
                headers: {
                    'X-Api-Key': '0UC43N6w8hVKR5g79MSAow==NnpBJEpY6oltkMXO',
                },
            });
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
                const { latitude, longitude } = data[0];
                return { latitude, longitude };
            }
            else {
                console.error('No coordinates found for the city:', city);
                return null;
            }
        }
        catch (error) {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    });
}
exports.getCoordinates = getCoordinates;
function getWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, {
                headers: {
                    'x-rapidapi-key': 'eccbcb306amsh5b803cdcd2bde03p1299aajsnce9260606dd4',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                },
            });
            const data = response.data;
            const temperature = data.current.temp_c;
            return temperature;
        }
        catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    });
}
exports.getWeather = getWeather;
function saveCityWeather(city, country, weather, longitude, latitude) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield model_1.default.create({
                city,
                country,
                weather,
                time: new Date(),
                longitude,
                latitude,
            });
            console.log('City weather saved successfully');
        }
        catch (error) {
            console.error('Error saving city weather:', error);
        }
    });
}
exports.saveCityWeather = saveCityWeather;
//# sourceMappingURL=service.js.map