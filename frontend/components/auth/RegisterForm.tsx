"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateRegister, type FieldErrors } from "@/utils/validators";
import { ROUTES } from "@/lib/constants";

export default function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegister(
      form.name,
      form.email,
      form.password,
      form.confirmPassword
    );
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
    } catch {
      // toast handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4" noValidate>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900 font-display">
          Create your account
        </h2>
        <p className="mt-1.5 text-sm text-mist-500">
          Start organizing your work in minutes.
        </p>
      </div>

      <Input
        id="name"
        label="Full name"
        type="text"
        placeholder="Jordan Rivera"
        icon={<User className="h-4 w-4" />}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        autoComplete="name"
      />

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
        placeholder="At least 6 characters"
        icon={<Lock className="h-4 w-4" />}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        autoComplete="new-password"
      />

      <Input
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Re-enter your password"
        icon={<Lock className="h-4 w-4" />}
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Create account
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-sm text-mist-500">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-semibold text-accent-600 hover:text-accent-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
