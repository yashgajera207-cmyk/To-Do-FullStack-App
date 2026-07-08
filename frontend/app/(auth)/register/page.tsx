import RegisterForm from "@/components/auth/RegisterForm";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 p-4">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,107,255,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(91,140,255,0.12),transparent_40%)]"
      />

      <div className="relative z-10 flex w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-card animate-fadeUp">
        <AuthShowcase />
        <div className="flex flex-1 items-center justify-center p-8 sm:p-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
