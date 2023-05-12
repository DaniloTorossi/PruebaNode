import { Router } from "express";
const router = Router();
import ProductManager from "../managers/ProductManager.js";
const productsManager = new ProductManager();

router.get('/', async(req, res) => {
    try {
        const products = await productsManager.getProducts();
        const limit = req.query.limit ? parseInt(req.query.limit) : 0;
        if (limit > 0) {
          const limitedProducts = products.slice(0, limit);
          const remainingProducts = products.slice(limit);
          res.status(200).json({ limitedProducts, remainingProducts });
        } else {
          res.status(200).render('products', {products});
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
      }
 });

 router.get('/socket', async(req, res)=>{
    try {
        try {
            const products = await productsManager.getProducts()
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
            if(limit){
                const limitedProducts = products.slice(0, limit);
                const remainingProducts = products.slice(limit); 
                res.status(200).render('websockets',{limitedProducts, remainingProducts});
            } else{
                res.status(200).render('websockets', {products});
            };
        } catch (error) {
            res.status(404).json({ message: error.message });
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});

export default router

