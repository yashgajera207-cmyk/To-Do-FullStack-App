"use client";

import { CheckCircle2, ListTodo, Plus, Timer } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentTasks from "@/components/dashboard/RecentTasks";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { useTasks } from "@/hooks/useTasks";

export default function DashboardPage() {
  const { tasks, isLoading } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <DashboardHeader />
        <a href="/tasks">
          <Button size="md">
            <Plus className="h-4 w-4" /> New task
          </Button>
        </a>
      </div>

      {isLoading ? (
        <Loader label="Fetching your tasks..." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatsCard label="Total tasks" value={total} icon={ListTodo} tone="accent" />
            <StatsCard label="Completed" value={completed} icon={CheckCircle2} tone="success" />
            <StatsCard label="Pending" value={pending} icon={Timer} tone="neutral" />
          </div>

          <RecentTasks tasks={tasks} />
        </>
      )}
    </div>
  );
}
