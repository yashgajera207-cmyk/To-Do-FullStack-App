import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import { formatRelative } from "@/utils/formatDate";
import { ROUTES } from "@/lib/constants";
import type { Task } from "@/types/task";

export default function RecentTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="rounded-xl2 border border-mist-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-ink-900">Recent tasks</h2>
        <Link
          href={ROUTES.tasks}
          className="flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          View all <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <EmptyState title="No tasks yet" description="Create your first task to see it here." />
      ) : (
        <ul className="divide-y divide-mist-100">
          {tasks.slice(0, 5).map((task) => (
            <li key={task.id} className="flex items-center gap-3 py-3">
              {task.completed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-mist-400" />
              )}
              <span
                className={`flex-1 truncate text-sm font-medium ${
                  task.completed ? "text-mist-400 line-through" : "text-ink-900"
                }`}
              >
                {task.title}
              </span>
              <span className="shrink-0 text-xs text-mist-400">{formatRelative(task.updatedAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
