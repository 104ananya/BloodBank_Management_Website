const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// -----------------------------------XXXXXXXXXXXXXXXXXXXXXXX-----------------------------------------------
// CREATE INVENTORY

const createInventoryController = async (req, res) => {
  try {
    // destructuring
    const { email, inventoryType } = req.body;

    // VALIDATION
    // find the user
    const user = await userModel.findOne({ email });

    // if not found
    if (!user) {
      throw new Error("User Not Found");
    }
    // only donar has permission to donate
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }
    // only hospital has permission to withdraw
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }

    //save record after checking above validation
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    // send response
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create_Inventory API",
      error,
    });
  }
};

module.exports = { createInventoryController };
