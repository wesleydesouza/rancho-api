const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const futurePurchases = require("./routes/futurePurchases");
const listPurchases = require("./routes/listPurchases");

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use("/futurePurchases", futurePurchases);
app.use("/listPurchases", listPurchases);

mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8yzgyyv.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });

module.exports = app;
