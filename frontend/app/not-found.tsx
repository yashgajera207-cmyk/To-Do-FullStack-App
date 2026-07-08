import Link from "next/link";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mist-50 px-4 text-center">
      <p className="font-display text-6xl font-bold text-accent-500">404</p>
      <h1 className="mt-3 text-xl font-semibold text-ink-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-mist-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link href="/">
        <Button className="mt-6">Back to home</Button>
      </Link>
    </div>
  );
}
