const Rental = require('./models/rental');
const User = require('./models/user');
const fakeDbData = require('./data.json');
const Booking = require('./models/booking');
class FakeDb {

  constructor(){
    this.rentals = fakeDbData.rentals;
    this.users = fakeDbData.users;
  }

  pushDataToDb() {

    const user = new User(this.users[0]);
    const user1 = new User(this.users[1]);

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user1.save();
  }
  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }

  async cleanDb() {
  //remove method is deprecated so using deleteMany .. for deleteMany if query is provided then it will delete multiple records that match the query and if empty paranthesis is provided then it will delete all the records
  await User.deleteMany({});
  await Rental.deleteMany({});
  await Booking.deleteMany({});
  }

}

module.exports = FakeDb;
