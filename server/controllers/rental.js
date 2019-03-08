const Rental = require('../models/rental');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createRental = function(req, res){

  const { title, city, street, category, image, bedrooms, shared, description, dailyRate, user } = req.body;

  const rental = new Rental({ title, city, street, category, image, bedrooms, shared, description, dailyRate });

  const userDetails = res.locals.user;
  rental.user = userDetails;
  rental.save(function(err, newRental) {
      if(err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      User.update(
        { _id: userDetails.id }, { $push: { rentals: newRental }}, function(){});

      return res.json({newRental});
    });
}



