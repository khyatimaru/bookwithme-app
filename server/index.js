const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const Rental = require("./models/rental");
const FakeDb = require("./fake-db");
const path = require("path");

const rentalRoutes = require("./routes/rentals"),
      userRoutes = require("./routes/users"),
      bookingRoutes = require("./routes/bookings");

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  if(process.env.NODE_ENV !== 'production') {
    const fakeDb = new FakeDb;
    //fakeDb.seedDb();
  }
});

const app = express();
//using middleware
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if(process.env.NODE_ENV === 'production') {

  const appPath = path.join(__dirname, '..', 'dist', 'bookwithme-app');
  app.use(express.static(appPath));

  app.get('*', function(req, res){
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001; //process.env.PORT is env var and if value is present then use that port otherwise use 3001

app.listen(PORT, function () {
  console.log("APP is running!");
});

