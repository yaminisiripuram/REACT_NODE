const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, date, description, amountType, amount) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amountType = amountType;
    this.amount = amount;
  }

  save(cb) {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          const product = updatedProducts.find((p) => p.id === this.id);
          cb(product);
        });
      } else {
        this.id = uuid();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          const product = products.find((p) => p.id === this.id);
          cb(product);
        });
      }
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        cb(id);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
