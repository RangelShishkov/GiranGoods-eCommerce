const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getOneProductCategory = require("../controller/product/getOneProductCategory");
const getProductCategory = require("../controller/product/getProductCategory");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCart = require("../controller/user/countAddToCart");
const addToCartViewProduct = require("../controller/user/addToCartView");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteCartProduct = require("../controller/user/deleteCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhook = require("../controller/order/webhook");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

//admin panel
router.get("/all-users", allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-products", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-category", getOneProductCategory);
router.post("/category-product", getProductCategory);
router.post("/product-details", getProductDetails);
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCart", authToken, countAddToCart);
router.get("/view-cart-product",authToken, addToCartViewProduct);
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteCartProduct)

//payment and order
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhook) // api/webhook

module.exports = router;
