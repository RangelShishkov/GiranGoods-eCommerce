const userModel = require("../../models/userModel");
const deleteUserPermission = require("../../helpers/permission");

const deleteUserController = async (req, res) => {
  try {
    if (!deleteUserPermission(req.userId)) {
       return res.status(403).json({
            message: "Permission denied",
            success: false,
          });
    }

    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteUserController;
