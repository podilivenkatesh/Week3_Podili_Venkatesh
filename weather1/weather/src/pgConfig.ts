import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'Venky@15',
});

sequelize.sync({ force: true }) 
  .then(() => {
    console.log("Database table created successfully");
  })
  .catch((err) => {
    console.error("Error creating database table");
  });

export default sequelize;
