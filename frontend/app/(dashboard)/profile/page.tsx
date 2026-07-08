"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Profile</h1>
        <p className="mt-1 text-sm text-mist-500">Your account details.</p>
      </div>
      {user ? <ProfileCard user={user} /> : <Loader />}
    </div>
  );
}
