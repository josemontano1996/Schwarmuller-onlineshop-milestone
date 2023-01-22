const bycrypt = require("bcryptjs");

const db = require("../database/database");

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

  getUserwithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async signUp() {
    const hashedPassword = await bycrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
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
