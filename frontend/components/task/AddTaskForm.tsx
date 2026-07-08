"use client";

import { useState, type FormEvent } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import type { CreateTaskPayload } from "@/types/task";

interface AddTaskFormProps {
  onSubmit: (payload: CreateTaskPayload) => Promise<unknown>;
  onDone: () => void;
}

export default function AddTaskForm({ onSubmit, onDone }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      await onSubmit({ title: title.trim(), description: description.trim() || undefined });
      onDone();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        label="Title"
        placeholder="e.g. Ship the landing page"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-mist-500">
          Description <span className="text-mist-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more detail..."
          className="w-full rounded-xl border border-mist-200 bg-mist-50 px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-mist-400 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
        />
      </div>
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Add task
      </Button>
    </form>
  );
}
