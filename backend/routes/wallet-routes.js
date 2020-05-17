const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const walletController = require("../controllers/wallet-controller");

router.get("/products", walletController.getProductsList);
router.get("/getProduct/:id", walletController.getProductById);

router.post(
  "/addProduct",
  [
    check("amountType").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("amount").not().isEmpty(),
  ],
  walletController.createProduct
);

router.put(
  "/updateProduct/:id",
  [
    check("amountType").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("amount").not().isEmpty(),
  ],
  walletController.updateProduct
);

router.delete("/deleteProduct/:id", walletController.deleteProduct);

module.exports = router;
