const listPurchasesRoute = require("express").Router();
const ListPurchasesDB = require("../models/ListPurchasesDB");

// Create = criação de dados
listPurchasesRoute.post("/", async (req, res) => {
  const { name, amount, price } = req.body;

  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório!" });
    return;
  }

  const listPurchasesDB = {
    name,
    amount,
    price,
  };

  try {
    // criando dados no db
    await ListPurchasesDB.create(listPurchasesDB);

    res.status(201).json({ message: "Produto inserido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - leitura de dados
listPurchasesRoute.get("/", async (req, res) => {
  try {
    const listPurchasesDB = await ListPurchasesDB.find();

    res.status(200).json(listPurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - rotas dinamicas
listPurchasesRoute.get("/:id", async (req, res) => {
  //extrair o dados da requisicao, pela url = req.params
  const id = req.params.id;

  try {
    const listPurchasesDB = await ListPurchasesDB.findOne({ _id: id });

    if (!listPurchasesDB) {
      res.status(422).json({ message: "Produto não encontrado!" });
      return;
    }

    res.status(200).json(listPurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - atualizacao de dados (PUT = atualiza td, PATCH = atualiza algumas coisas)
listPurchasesRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, amount, price } = req.body;

  const listPurchasesDB = {
    name,
    amount,
    price,
  };

  try {
    const updatedProduct = await ListPurchasesDB.updateOne(
      { _id: id },
      listPurchasesDB
    );

    if (updatedProduct.matchedCount === 0) {
      res.status(422).json({ message: "Produto não atualizado!" });
      return;
    }

    res.status(200).json(listPurchasesDB);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - deletar dados
listPurchasesRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const listPurchasesDB = await ListPurchasesDB.findOne({ _id: id });

  if (!listPurchasesDB) {
    res.status(422).json({ message: "Produto não encontrado!" });
    return;
  }
  try {
    await ListPurchasesDB.deleteOne({ _id: id });
    res.status(200).json({ message: "Produto removido!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = listPurchasesRoute;
