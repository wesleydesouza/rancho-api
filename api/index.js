const express = require("express");

const app = express();

const futurePurchases = require("./routes/futurePurchases");
const listPurchases = require("./routes/listPurchases");

app.use("/futurePurchases", futurePurchases);
app.use("/listPurchases", listPurchases);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
