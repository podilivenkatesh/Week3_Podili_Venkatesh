"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
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
exports.default = sequelize;
//# sourceMappingURL=pgConfig.js.map