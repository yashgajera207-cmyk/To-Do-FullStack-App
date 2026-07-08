"use client";

import { useMemo, useState } from "react";
import { ListChecks, Plus } from "lucide-react";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import TaskCard from "@/components/task/TaskCard";
import TaskTable from "@/components/task/TaskTable";
import TaskModal from "@/components/task/TaskModal";
import DeleteDialog from "@/components/task/DeleteDialog";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";

type Filter = "all" | "pending" | "completed";

export default function TasksPage() {
  const { tasks, isLoading, createTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const openCreate = () => {
    setModalMode("create");
    setActiveTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setModalMode("edit");
    setActiveTask(task);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Tasks</h1>
          <p className="mt-1 text-sm text-mist-500">Everything you need to get done.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> New task
        </Button>
      </div>

      <div className="flex gap-2">
        {(["all", "pending", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
              filter === f
                ? "bg-ink-900 text-white"
                : "bg-white text-mist-500 border border-mist-200 hover:bg-mist-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Loader label="Fetching your tasks..." />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          icon={<ListChecks className="h-6 w-6" />}
          title="No tasks here"
          description="Create a task to start tracking your work."
          action={<Button onClick={openCreate}>Add your first task</Button>}
        />
      ) : (
        <>
          <TaskTable
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={openEdit}
            onDelete={(task) => setDeleteTarget(task)}
          />
          <div className="space-y-3 md:hidden">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={(t) => setDeleteTarget(t)}
              />
            ))}
          </div>
        </>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        task={activeTask}
        onCreate={createTask}
        onUpdate={updateTask}
      />

      <DeleteDialog
        isOpen={Boolean(deleteTarget)}
        task={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteTask}
      />
    </div>
  );
}
