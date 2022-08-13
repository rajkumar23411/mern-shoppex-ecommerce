const mongoose = require("mongoose");

const databaseConnection = () => {
   mongoose
      .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((data) =>
         console.log(
            `Database connected successfully to ${data.connection.host}`
         )
      );
};

module.exports = databaseConnection;
