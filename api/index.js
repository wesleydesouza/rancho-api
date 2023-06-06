require("dotenv").config();
const cors = require("cors");
const dot = process.env;
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const futurePurchases = require("./routes/futurePurchases");
const listPurchases = require("./routes/listPurchases");

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/futurePurchases", futurePurchases);
app.use("/listPurchases", listPurchases);

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${dot.DB_USER}:${dot.DB_PASSWORD}@cluster0.8yzgyyv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(PORT),
      () => console.log(`Servidor iniciado em http://localhost:${PORT}`);
  })
  .catch((error) => console.log(`erro: ${error}`));
