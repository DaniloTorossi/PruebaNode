import express from "express";
import ProductManager from "./Desafio2/ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const manager = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

try {
} catch (error) {}

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await manager.findProductById(Number(id));
    if (productId) {
      res.status(200).json(productId);
    } else {
      res.status(400).send("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await manager.createProducts(product);
    res.json(newProduct);
  } catch (error) {}
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});
