const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const Rental = require("./models/rental");
const FakeDb = require("./fake-db");
const rentalRoutes = require("./routes/rentals");

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  const fakeDb = new FakeDb;
  fakeDb.seedDb();
});

const app = express();
//using middleware
app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001; //process.env.PORT is env var and if value is present then use that port otherwise use 3001

app.listen(PORT, function () {
  console.log("APP is running!");
});

