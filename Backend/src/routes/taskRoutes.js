const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/taskValidator");

const {
  create,
  getAll,
  getById,
  update,
  toggle,
  remove,
} = require("../controllers/taskController");

// Protect all routes
router.use(protect);

// Get all tasks
router.get("/", getAll);

// Get single task
router.get("/:id", getById);

// Create task
router.post("/", createTaskValidator, create);

// Update task
router.put("/:id", updateTaskValidator, update);

// Toggle completed
router.patch("/:id/toggle", toggle);

// Delete task
router.delete("/:id", remove);

module.exports = router;
