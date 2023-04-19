const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./Productos.json";
  }


  // crea el producto
  async createProds(products) {
    try {
      const productsFile = await this.addProducts();
      productsFile.push(products);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }

  async addProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productJS = JSON.parse(products);
        return productJS;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  getProductById = (idProduct) => {
    let findProduct = this.products.find((product) => product.id == idProduct);
    if (findProduct) {
      return findProduct;
    } else {
      return console.log("not found");
    }
  };

  #nuevoId() {
    let maxId = 0;
    this.products.map((Product) => {
      if (Product.id > maxId) maxId = Product.id;
    });
    return maxId;
  }
  id;

  #nuevoCode() {
    let maxCode = 0;
    this.products.map((Product) => {
      if (Product.code > maxCode) maxCode = Product.code;
    });
    return maxCode;
  }




}

const producto = new ProductManager();

const producto1 = {
  id: 1,
  code: 1,
  Producto: "Remera",
  Descripcion: "Color Blanco",
  Precio: "$200",
  Stock: "2",
  Img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsublitextil.com.ar%2Fproductos%2Fremera-adulto-sublimable%2F&psig=AOvVaw3pAeM_YDUkguvzRaFoiLBQ&ust=1681170749541000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCNuJ3_nf4CFQAAAAAdAAAAABAE",
};
const producto2 = {
  id: 2,
  code: 2,
  Producto: "Buzo",
  Descripcion: "Color Rojo",
  Precio: "$400",
  Stock: "4",
  Img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpda.com.ar%2Fproductos%2Fbuzo-canguro-rojo-frisa-invisible-premium%2F%3Fvariant%3D459074666&psig=AOvVaw2dsnC6mVwm9E8KOaxCZMPx&ust=1681171506293000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJDKiIWCnv4CFQAAAAAdAAAAABAE ",
};
const producto3 = {
  id: 3,
  code: 3,
  Producto: "Pantalon",
  Descripcion: "Color Azul",
  Precio: "$1500",
  Stock: "3",
  Img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Flistado.mercadolibre.com.ar%2Fpantalon-azul-hombre&psig=AOvVaw1lEjecn9CoZ3Qo3WhVkv6i&ust=1681171523744000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCPwo2Cnv4CFQAAAAAdAAAAABAE",
};

const test = async () => {
  const get = await producto.addProducts();
  console.log("primer consulta", get);
  await producto.createProds(producto1);
  const get2 = await producto.addProducts();
  console.log("segunda consulta", get2);
  await producto.createProds(producto2);
  const get3 = await producto.addProducts();
  console.log("tercera consulta", get3);
  await producto.createProds(producto3);
};
test();
