class ProductManager {
  constructor() {
    this.products = [];
  }

  /* constructor de productos */
  addProduct(Producto, Descripcion, Precio, Stock, Img) {
    const Product = {
      id: this.#nuevoId() + 1,
      Producto,
      Descripcion,
      Precio,
      Stock,
      Img,
    };

    this.products.push(Product);
  }

  getProducts = () => {
    return this.products;
  };

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
}

const productManager = new ProductManager();

productManager.addProduct(
  "Remera",
  "Color Blanco",
  "$200",
  "2",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsublitextil.com.ar%2Fproductos%2Fremera-adulto-sublimable%2F&psig=AOvVaw3pAeM_YDUkguvzRaFoiLBQ&ust=1681170749541000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCNuJ3_nf4CFQAAAAAdAAAAABAE"
);
productManager.addProduct(
  "Buzo",
  "Color Rojo",
  "$400",
  "4",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpda.com.ar%2Fproductos%2Fbuzo-canguro-rojo-frisa-invisible-premium%2F%3Fvariant%3D459074666&psig=AOvVaw2dsnC6mVwm9E8KOaxCZMPx&ust=1681171506293000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJDKiIWCnv4CFQAAAAAdAAAAABAE "
);
productManager.addProduct(
  "Pantalon",
  "Color Azul",
  "$1500",
  "3",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Flistado.mercadolibre.com.ar%2Fpantalon-azul-hombre&psig=AOvVaw1lEjecn9CoZ3Qo3WhVkv6i&ust=1681171523744000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCPwo2Cnv4CFQAAAAAdAAAAABAE"
);

/* Arrays completo de productos */
console.log(productManager.getProducts());
/* Filtro de id */
console.log(productManager.getProductById(4));
