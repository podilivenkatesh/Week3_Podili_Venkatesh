"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("./pgConfig"));
class CityWeather extends sequelize_1.Model {
}
CityWeather.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weather: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: pgConfig_1.default,
    modelName: 'CityWeather',
    timestamps: false,
});
exports.default = CityWeather;
//# sourceMappingURL=model.js.map