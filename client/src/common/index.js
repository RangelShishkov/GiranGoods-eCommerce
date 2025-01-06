const backendDomain = import.meta.env.VITE_BACKEND_URL  //"http://localhost:8080" 

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  deleteUser: {
    url: `${backendDomain}/api/delete-user`,
    method: "delete",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
    method: "delete",
  },
  allProducts: {
    url: `${backendDomain}/api/get-products`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-category`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCart`,
    method: "get",
  },
  addToCartViewProduct: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendDomain}/api/checkout`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomain}/api/order-list`,
    method: "get",
  },
  allOrders: {
    url: `${backendDomain}/api/all-orders`,
    method: "get",
  },
};

export default SummaryApi;
