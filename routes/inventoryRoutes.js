const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes

// ADD INVENTORY
router.post("/create_inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORD
router.get("/get_inventory", authMiddleware, getInventoryController);

module.exports = router;
