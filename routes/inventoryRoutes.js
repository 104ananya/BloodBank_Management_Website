const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes
// ADD INVENTORY
router.post("/create_inventory", authMiddleware, createInventoryController);

module.exports = router;
