"use client";

import { useState, type FormEvent } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import type { Task, UpdateTaskPayload } from "@/types/task";

interface EditTaskFormProps {
  task: Task;
  onSubmit: (id: number, payload: UpdateTaskPayload) => Promise<unknown>;
  onDone: () => void;
}

export default function EditTaskForm({ task, onSubmit, onDone }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(task.id, { title: title.trim(), description: description.trim() });
      onDone();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="edit-title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-mist-500">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-mist-200 bg-mist-50 px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-mist-400 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
        />
      </div>
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Save changes
      </Button>
    </form>
  );
}
