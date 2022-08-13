const app = require("./app");
const express = require("express");
const cloudinary = require('cloudinary');
const DatabaseConnection = require("./database/db");
const dotenv = require('dotenv')

//dotenvd
dotenv.config({ path: "config/config.env" });

//handling uncaught error
process.on("uncaughtException", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Server has been closed`);
   process.exit(1);
});

//database
DatabaseConnection();
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.COLUD_API_SECRET
})
//app port
app.use(express.json());
const server = app.listen(process.env.PORT, () =>
   console.log(`Server is stated on port ${process.env.PORT}`)
);
//Handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Server has been closed`);
   server.close(process.exit(1));
});