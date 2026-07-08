const { validationResult } = require("express-validator");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} = require("../services/taskService");

// ===============================
// Create Task
// ===============================
const create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const task = await createTask(req.user.id, req.body);

  res.status(201).json(
    new ApiResponse(201, "Task created successfully", task)
  );
});

// ===============================
// Get All Tasks
// ===============================
const getAll = asyncHandler(async (req, res) => {
  const tasks = await getAllTasks(req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Tasks fetched successfully", tasks)
  );
});

// ===============================
// Get Task By ID
// ===============================
const getById = asyncHandler(async (req, res) => {
  const task = await getTaskById(
    req.params.id,
    req.user.id
  );

  res.status(200).json(
    new ApiResponse(200, "Task fetched successfully", task)
  );
});

// ===============================
// Update Task
// ===============================
const update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const task = await updateTask(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(200, "Task updated successfully", task)
  );
});

// ===============================
// Toggle Task
// ===============================
const toggle = asyncHandler(async (req, res) => {
  const task = await toggleTask(
    req.params.id,
    req.user.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Task status updated successfully",
      task
    )
  );
});

// ===============================
// Delete Task
// ===============================
const remove = asyncHandler(async (req, res) => {
  await deleteTask(req.params.id, req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Task deleted successfully")
  );
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  toggle,
  remove,
};