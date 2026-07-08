import type { AxiosError } from "axios";

export const cn = (
  ...classes: Array<string | boolean | null | undefined>
) => classes.filter(Boolean).join(" ");

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return (
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    "Something went wrong. Please try again."
  );
};

export const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};
