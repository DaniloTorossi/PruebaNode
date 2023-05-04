import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await this.getProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    if (limit > 0) {
      const limitedProducts = products.slice(0, limit);
      const remainingProducts = products.slice(limit);
      res.status(200).json({ limitedProducts, remainingProducts });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

try {
} catch (error) {}

router.get("/", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await manager.findProductById(id);
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

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await manager.createProducts(product);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { key, value } = req.body;
    const { id } = req.params;
    const productFound = await productsManager.findProductByIdProducts(id);
    if (productFound) {
      await productsManager.updateProduct(id, key, value);
      res.send(`product updated successfully!`);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsRemove = await manager.deleteProduct(id);
    if (productsRemove) {
      res
        .status(200)
        .send(`product with id:${productToRemove} removed successfully`);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleteAllProducts = await manager.deleteAllProducts();
    res.send("products deleted successfully");
    if (deleteAllProducts) {
      res
        .status(200)
        .send(`products in path ${deleteAllProducts} deleted successfully`);
    } else {
      res.status(404).send("path does not exist");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
