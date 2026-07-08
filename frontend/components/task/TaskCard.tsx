"use client";

import { Circle, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/common/Badge";
import { formatRelative } from "@/utils/formatDate";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="group flex items-start gap-3 rounded-xl2 border border-mist-200 bg-white p-4 transition-all hover:border-accent-500/30 hover:shadow-card">
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 shrink-0 text-mist-400 transition-colors hover:text-accent-500"
        aria-label="Toggle complete"
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5 text-accent-500" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={`truncate text-[15px] font-semibold ${
              task.completed ? "text-mist-400 line-through" : "text-ink-900"
            }`}
          >
            {task.title}
          </p>
          <Badge variant={task.completed ? "success" : "pending"}>
            {task.completed ? "Done" : "Pending"}
          </Badge>
        </div>
        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-mist-500">{task.description}</p>
        )}
        <p className="mt-2 text-xs text-mist-400">Updated {formatRelative(task.updatedAt)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
    </div>
  );
}
