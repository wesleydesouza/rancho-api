const mongoose = require("mongoose");

const FuturePurchasesDB = mongoose.model("FuturePurchasesDB", {
  name: String,
  amount: Number,
});

module.exports = FuturePurchasesDB;
