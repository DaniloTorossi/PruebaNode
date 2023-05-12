import express from "express";
import ProductsRoutes from "../src/TrabajoFinal/routes/ProductsRoutes.js";
import routerCart from "../src/TrabajoFinal/routes/CartsRoutes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import Handlebars from "express-handlebars";
import viewsRouter from "../src/TrabajoFinal/routes/views.router.js"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/TrabajoFinal/public"));
app.use(morgan("dev"));
app.engine("handlebars", Handlebars.engine());
app.set("views", __dirname + "/TrabajoFinal/views");
app.set("view engine", "handlebars");

app.use("/products", ProductsRoutes);
app.use("/carts", routerCart);
app.use('/', viewsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀🚀 server listening port ${PORT}`);
});
