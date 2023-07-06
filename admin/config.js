const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345678",
    PORT: "3306",
    DB: "novels",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
module.exports = {dbConfig};