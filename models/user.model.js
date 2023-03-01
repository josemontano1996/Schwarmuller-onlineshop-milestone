const bycrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../database/database');

class User {
  constructor(email, password, fullname, street, postalcode, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalcode: postalcode,
      city: city,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection('users')
      .findOne({ _id: uid }, { projection: { password: 0 } });
    // 0 avoid password from being fetched from db
  }

  getUserwithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  async emailExistsAlready() {
    const existingUser = await this.getUserwithSameEmail();

    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  async signUp() {
    const hashedPassword = await bycrypt.hash(this.password, 12);

    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  hasMatchingPassword(hashedPassword) {
    return bycrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
