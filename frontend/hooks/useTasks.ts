"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { taskService } from "@/services/task.service";
import { getErrorMessage } from "@/utils/helpers";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await taskService.getAll();
      if (res.success) setTasks(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (payload: CreateTaskPayload) => {
    try {
      const res = await taskService.create(payload);
      if (res.success) {
        setTasks((prev) => [res.data, ...prev]);
        toast.success("Task created");
        return res.data;
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  }, []);

  const updateTask = useCallback(
    async (id: number, payload: UpdateTaskPayload) => {
      try {
        const res = await taskService.update(id, payload);
        if (res.success) {
          setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
          toast.success("Task updated");
          return res.data;
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
      }
    },
    []
  );

  const toggleTask = useCallback(async (id: number) => {
    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const res = await taskService.toggle(id);
      if (res.success) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      }
    } catch (err) {
      setTasks(previous);
      toast.error(getErrorMessage(err));
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id: number) => {
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.remove(id);
      toast.success("Task deleted");
    } catch (err) {
      setTasks(previous);
      toast.error(getErrorMessage(err));
    }
  }, [tasks]);

  return {
    tasks,
    isLoading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
