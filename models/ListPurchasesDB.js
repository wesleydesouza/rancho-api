const mongoose = require("mongoose");

const ListPurchasesDB = mongoose.model("ListPurchasesDB ", {
  name: String,
  amount: Number,
  price: Number,
});

module.exports = ListPurchasesDB;
