import api from "@/lib/axios";
import type { ApiResult } from "@/types/api";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "@/types/task";

export const taskService = {
  getAll: async () => {
    const { data } = await api.get<ApiResult<Task[]>>("/tasks");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<ApiResult<Task>>(`/tasks/${id}`);
    return data;
  },

  create: async (payload: CreateTaskPayload) => {
    const { data } = await api.post<ApiResult<Task>>("/tasks", payload);
    return data;
  },

  update: async (id: number, payload: UpdateTaskPayload) => {
    const { data } = await api.put<ApiResult<Task>>(`/tasks/${id}`, payload);
    return data;
  },

  toggle: async (id: number) => {
    const { data } = await api.patch<ApiResult<Task>>(`/tasks/${id}/toggle`);
    return data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete<ApiResult<null>>(`/tasks/${id}`);
    return data;
  },
};
