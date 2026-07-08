"use client";

import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/common/Badge";
import { formatDate } from "@/utils/formatDate";
import type { Task } from "@/types/task";

interface TaskTableProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskTable({ tasks, onToggle, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl2 border border-mist-200 bg-white md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-mist-200 bg-mist-50/60 text-xs font-semibold uppercase tracking-wide text-mist-400">
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Task</th>
            <th className="px-4 py-3 font-semibold">Updated</th>
            <th className="px-4 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-mist-100 last:border-0 hover:bg-mist-50/40">
              <td className="px-4 py-3">
                <button onClick={() => onToggle(task.id)} className="text-mist-400 hover:text-accent-500">
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-accent-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <p className={`font-semibold ${task.completed ? "text-mist-400 line-through" : "text-ink-900"}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-mist-500">{task.description}</p>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge variant={task.completed ? "success" : "pending"}>
                  {formatDate(task.updatedAt)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-mist-100 hover:text-accent-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(task)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
