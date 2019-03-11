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

router.get('/manage', UserCtrl.authMiddleware, function (req, res) {
  const user = res.locals.user;
  Rental
    .where({user})
    .populate('bookings')
    .exec(function(err, foundRentals) {
      if(err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json(foundRentals);
    })
});

router.get("/:id", function (req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if(err){
        return res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find Rental'}]})
      }
      res.json(foundRental);
  });
});

router.delete("/:id", UserCtrl.authMiddleware, function (req, res) {
  const user = res.locals.user;
  console.log('user  === ', user);

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: {startAt: {$gt: new Date()}}
    })
    .exec(function(err, foundRental) {
      console.log('Found rental === ', foundRental);
      if(err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if(user.id != foundRental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not Rental owner!'}]})
      }
      if(foundRental.bookings.length > 0) {
        return res.status(422).send({errors: [{title: 'Active Bookings', detail: 'Cannot delete Rental with Active Bookings!'}]})
      }

      foundRental.remove(function(err) {
        if(err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json({'status': 'deleted'});
      });
  })
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
