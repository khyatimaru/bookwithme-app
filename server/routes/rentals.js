const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const RentalCtrl = require('../controllers/rental');
const UserCtrl = require('../controllers/user');

const { normalizeErrors } = require('../helpers/mongoose');


router.post("", UserCtrl.authMiddleware, RentalCtrl.createRental);

router.get('/secret', UserCtrl.authMiddleware, function(req, res){
  res.json({'secret':true});
});

router.get("/:id", function (req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if(err){
        res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find Rental'}]})
      }
      res.json(foundRental);
  });
});

router.get("", function(req, res){

  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};

  Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals){

    if(err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    if(city && foundRentals.length === 0) {
      return res.status(422).send({errors: [{title: 'No Rentals Found', detail: `There are no Rentals for city ${city}`}]});
      //`There are no Rentals for city ${city}` is same as 'There are no Rentals for city' + city
    }
    return res.json(foundRentals);
  });
});

module.exports = router;
