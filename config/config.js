const dotenv = require('dotenv');
const path = require("path");

if (!process.env.HOST){
  dotenv.config({
    path: path.join(__dirname, "..", ".env")
  })
}
console.log( process.env.USER)
console.log(process.env.PASS)
module.exports = {
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
  dialect: "postgres"
}