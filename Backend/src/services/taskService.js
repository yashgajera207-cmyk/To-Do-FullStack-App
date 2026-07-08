const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");

// ===============================
// Create Task
// ===============================
const createTask = async (userId, taskData) => {
  const { title, description } = taskData;

  return await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

// ===============================
// Get All Tasks
// ===============================
const getAllTasks = async (userId) => {
  return await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ===============================
// Get Task By ID
// ===============================
const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      userId,
    },
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

// ===============================
// Update Task
// ===============================
const updateTask = async (taskId, userId, data) => {
  await getTaskById(taskId, userId);

  return await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      title: data.title,
      description: data.description,
    },
  });
};

// ===============================
// Delete Task
// ===============================
const deleteTask = async (taskId, userId) => {
  await getTaskById(taskId, userId);

  await prisma.task.delete({
    where: {
      id: Number(taskId),
    },
  });

  return;
};

// ===============================
// Toggle Complete
// ===============================
const toggleTask = async (taskId, userId) => {
  const task = await getTaskById(taskId, userId);

  return await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      completed: !task.completed,
    },
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
};