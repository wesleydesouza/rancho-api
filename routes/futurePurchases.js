const futurePurchasesRoute = require("express").Router();
const FuturePurchasesDB = require("../models/FuturePurchasesDB");

// Create = criação de dados
futurePurchasesRoute.post("/", async (req, res) => {
  const { name, amount } = req.body;

  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório!" });
    return;
  }

  const futurePurchasesDB = {
    name,
    amount,
  };

  try {
    // criando dados no db
    await FuturePurchasesDB.create(futurePurchasesDB);

    res.status(201).json({ message: "Produto inserido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - leitura de dados
futurePurchasesRoute.get("/", async (req, res) => {
  try {
    const futurePurchasesDB = await FuturePurchasesDB.find();

    res.status(200).json(futurePurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - rotas dinamicas
futurePurchasesRoute.get("/:id", async (req, res) => {
  //extrair o dados da requisicao, pela url = req.params
  const id = req.params.id;

  try {
    const futurePurchasesDB = await FuturePurchasesDB.findOne({ _id: id });

    if (!futurePurchasesDB) {
      res.status(422).json({ message: "Produto não encontrado!" });
      return;
    }

    res.status(200).json(futurePurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - atualizacao de dados (PUT = atualiza td, PATCH = atualiza algumas coisas)
futurePurchasesRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, amount } = req.body;

  const futurePurchasesDB = {
    name,
    amount,
  };

  try {
    const updatedProduct = await FuturePurchasesDB.updateOne(
      { _id: id },
      futurePurchasesDB
    );

    if (updatedProduct.matchedCount === 0) {
      res.status(422).json({ message: "Produto não atualizado!" });
      return;
    }

    res.status(200).json(futurePurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - deletar dados
futurePurchasesRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const futurePurchasesDB = await FuturePurchasesDB.findOne({ _id: id });

  if (!futurePurchasesDB) {
    res.status(422).json({ message: "Produto não encontrado!" });
    return;
  }
  try {
    await FuturePurchasesDB.deleteOne({ _id: id });
    res.status(200).json({ message: "Produto removido!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = futurePurchasesRoute;
