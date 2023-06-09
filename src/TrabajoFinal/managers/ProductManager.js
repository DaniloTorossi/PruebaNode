import fs from 'fs';
export default class ProductManager {
  constructor() {
    this.pathProducts = "./productsAdded.json";
    this.pathCart = "./productsCart.json";
    this.newId = 0;
  }

 getMaxId = async () => {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((prod) => {
      if (prod.id > maxId) maxId = prod.id;
    });
    return maxId;
  };




  async getProducts() {
    try {
      if (fs.existsSync(this.pathProducts)) {
        const productsJSON = await fs.promises.readFile(
          this.pathProducts,
          "utf-8"
        );
        const products = JSON.parse(productsJSON);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createProducts(product) {
    try {
      const productsFile = await this.getProducts();
      let findCode = await this.repeatedCode(product.code, productsFile);
      if (findCode) {
        console.log("ya existe un producto con este code");
      } else {
        (product.id = this.generateId()), (product.amount = 0);
        productsFile.push(product);
        await fs.promises.writeFile(
          this.pathProducts,
          JSON.stringify(productsFile)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async repeatedCode(code, productsFile) {
    try {
      const findCode = productsFile.find(
        (prodIterated) => prodIterated.code === code
      );
      return findCode;
    } catch (error) {
      console.log(error);
    }
  }
  generateId() {
    return this.newId++;
  }
  async upDateProduct(id, upDateKey, upDateValue) {
    try {
      if (
        upDateKey === "Producto" ||
        upDateKey === "Precio" ||
        upDateKey === "Descripcion" ||
        upDateKey === "Img" ||
        upDateKey === "code" ||
        upDateKey === "stock"
      ) {
        let productsFile = await this.getProducts();
        let productFind = await this.findProductById(id, this.getProducts());
        productsFile = productsFile.filter((product) => product.id !== id);
        productFind[upDateKey] = upDateValue;
        productsFile.push(productFind);
        await fs.promises.writeFile(
          this.pathProducts,
          JSON.stringify(productsFile)
        );
      } else {
        console.log("Error: upDateKey debe ser una propieda valida");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // funciones del carrito

  async getCart() {
    try {
      if (fs.existsSync(this.pathCart)) {
        const productsCartJSON = await fs.promises.readFile(
          this.pathCart,
          "utf-8"
        );
        const productsCart = JSON.parse(productsCartJSON);
        return productsCart;
      } else {
        await fs.promises.writeFile(this.pathCart, JSON.stringify([]));
        const productsCartJSON = await fs.promises.readFile(
          this.pathCart,
          "utf-8"
        );
        const productsCart = JSON.parse(productsCartJSON);
        return productsCart;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(id) {
    const productFindAdded = await this.findProductById(id, this.getProducts());
    if (productFindAdded === null) {
      console.log("el producto que intentas agregar no existe");
    } else {
      let productsCart = await this.getCart();
      let productFindCart = await this.findProductById(id, this.getCart());
      if (productFindCart === null) {
        productFindAdded.amount = 1;
        productFindAdded.unitPrice = productFindAdded.price;
        productsCart.push(productFindAdded);
      } else {
        productsCart = productsCart.filter((product) => product.id !== id);
        productFindCart.amount++;
        productFindCart.price =
          productFindCart.unitPrice * productFindCart.amount;
        productsCart.push(productFindCart);
      }
      await fs.promises.writeFile(this.pathCart, JSON.stringify(productsCart));
    }
  }
  async deleteProduct(id) {
    const productFind = await this.findProductById(id, this.getCart());
    let productsCart = await this.getCart();
    if (productFind === null) {
      console.log("El producto que intentas eliminar no existe en el carrito");
    } else {
      if (productFind.amount < 2) {
        productsCart = productsCart.filter(
          (product) => product.id !== productFind.id
        );
      } else {
        productsCart = productsCart.filter((product) => product.id !== id);
        productFind.amount = productFind.amount - 1;
        productFind.price = productFind.unitPrice * productFind.amount;
        productsCart.push(productFind);
      }
      await fs.promises.writeFile(this.pathCart, JSON.stringify(productsCart));
    }
  }

  async deleteAllProducts(){
    try {
        if(fs.existsSync(this.path)){
            await fs.promises.unlink(this.path)
        }
    } catch (error) {
        console.log(error);
    }
}





  async findProductById(searchedId) {
    try {
      const products = await this.getProducts();
      const find = products.find(
        (prodIterated) => prodIterated.id === searchedId
      );
      if (find) {
        return find;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}



