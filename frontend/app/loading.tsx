import Loader from "@/components/common/Loader";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist-50">
      <Loader label="Loading..." />
    </div>
  );
}
