const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const products = require("./db/products.json");

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Не найдено" });
  }

  products.splice(productIndex, 1);

  res.json({ message: "Успешно", id: productId });
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(product);
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is run`);
});
