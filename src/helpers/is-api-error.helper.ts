import { APIError } from "@/types/api";

export default function isApiError<TData>(error: unknown): error is APIError<TData> {
  return typeof error === "object" && error !== null && "statusCode" in error && "data" in error;
}
