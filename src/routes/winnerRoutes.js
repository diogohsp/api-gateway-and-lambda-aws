const express = require("express");
const router = express.Router();
const winnerController = require("../controllers/winnerController");

// Create
router.post("/", winnerController.createWinner);

// Read
router.get("/", winnerController.getWinners);

// Delete
router.delete("/:id", winnerController.deleteWinner);

module.exports = router;
