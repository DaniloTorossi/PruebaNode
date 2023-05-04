import express from 'express';
import ProductsRoutes from "../src/TrabajoFinal/routes/ProductsRoutes.js";
import routerCart from './routes/CartsRouter.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/TrabajoFinal/public'));
app.use(morgan('dev'));


app.use('/products', ProductsRoutes);
app.use('/carts', routerCart)

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀🚀 server listening port ${PORT}`);
});

