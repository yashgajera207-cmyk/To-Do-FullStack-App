"use client";

import Modal from "@/components/common/Modal";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "@/types/task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task | null;
  onCreate: (payload: CreateTaskPayload) => Promise<unknown>;
  onUpdate: (id: number, payload: UpdateTaskPayload) => Promise<unknown>;
}

export default function TaskModal({ isOpen, onClose, mode, task, onCreate, onUpdate }: TaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "create" ? "New task" : "Edit task"}>
      {mode === "create" ? (
        <AddTaskForm onSubmit={onCreate} onDone={onClose} />
      ) : task ? (
        <EditTaskForm task={task} onSubmit={onUpdate} onDone={onClose} />
      ) : null}
    </Modal>
  );
}
