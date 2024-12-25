const productModel = require("../../models/productModel");
const deleteProductPermission = require("../../helpers/permission");

const deleteProductController = async (req, res) => {
  try {
    if (!deleteProductPermission(req.userId)) {
      return res.status(403).json({
        message: "Permission denied",
        success: false,
      });
    }

    const { _id } = req.body;

    const deletedProduct = await productModel.findByIdAndDelete(_id);

    res.json({
      message: "Product deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteProductController;
