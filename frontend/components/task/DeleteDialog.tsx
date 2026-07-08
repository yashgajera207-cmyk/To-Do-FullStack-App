"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import type { Task } from "@/types/task";

interface DeleteDialogProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteDialog({ isOpen, task, onClose, onConfirm }: DeleteDialogProps) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-ink-900">Delete this task?</h3>
        <p className="mt-1.5 text-sm text-mist-500">
          "{task.title}" will be permanently removed. This can't be undone.
        </p>
        <div className="mt-6 flex w-full gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={() => {
              onConfirm(task.id);
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
