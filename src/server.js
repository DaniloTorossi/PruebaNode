import express from "express";
import ProductsRoutes from "../src/TrabajoFinal/routes/ProductsRoutes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import Handlebars from "express-handlebars";
import CartManager from "./TrabajoFinal/managers/CartManager.js";
import HandlebarsRoutes from "./TrabajoFinal/routes/HandlebarsRoutes.js";




const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/TrabajoFinal/public"));
app.use(morgan("dev"));
app.engine("handlebars", Handlebars.engine());
app.set("views", __dirname + "/TrabajoFinal/views");
app.set("view engine", "handlebars");

app.use("/productsFile", ProductsRoutes);
app.use("/carts", CartManager);
app.use('/', HandlebarsRoutes);



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀🚀 server listening port ${PORT}`);
});
