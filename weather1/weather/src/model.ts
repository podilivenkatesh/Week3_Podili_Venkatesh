import { DataTypes, Model } from 'sequelize';
import sequelize from './pgConfig';

interface CityWeatherAttributes {
  id?: number;
  city: string;
  country: string;
  weather: number;
  time?: Date;
  longitude: number;
  latitude: number;
}

class CityWeather extends Model<CityWeatherAttributes> implements CityWeatherAttributes {
  public id!: number;
  public city!: string;
  public country!: string;
  public weather!: number;
  public time!: Date;
  public longitude!: number;
  public latitude!: number;
}

CityWeather.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CityWeather',
    timestamps:false,
  }
);

export default CityWeather;
