"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateLogin, type FieldErrors } from "@/utils/validators";
import { ROUTES } from "@/lib/constants";

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLogin(form.email, form.password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(form);
    } catch {
      // toast handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5" noValidate>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900 font-display">
          Welcome back
        </h2>
        <p className="mt-1.5 text-sm text-mist-500">
          Sign in to keep your tasks moving.
        </p>
      </div>

      <Input
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="h-4 w-4" />}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        autoComplete="current-password"
      />

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Sign in
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-sm text-mist-500">
        New to TaskFlow?{" "}
        <Link href={ROUTES.register} className="font-semibold text-accent-600 hover:text-accent-700">
          Create an account
        </Link>
      </p>
    </form>
  );
}
