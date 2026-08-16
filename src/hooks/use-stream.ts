import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import type { StreamId } from "@/lib/curriculum";

/**
 * Resolves the user's stream:
 * 1. user.stream (persisted)
 * 2. ?stream=neet|jee query param (first-run handoff from landing page)
 * 3. null → caller should show the stream picker
 *
 * When a valid param arrives and the user has no stream yet, it persists it
 * exactly once (guarded against StrictMode double-effects).
 */
export function useStream() {
  const { user } = useAuth();
  const setStreamMutation = useMutation(api.users.setStream);
  const [searchParams, setSearchParams] = useSearchParams();
  const persistedRef = useRef(false);

  const param = searchParams.get("stream");
  const paramValid: StreamId | null =
    param === "neet" || param === "jee" ? param : null;

  const stream: StreamId | null = user?.stream ?? paramValid;

  useEffect(() => {
    if (!paramValid) return;
    if (user?.stream) {
      // Clean up the handoff param once the stream is persisted.
      setSearchParams({}, { replace: true });
      return;
    }
    if (!persistedRef.current) {
      persistedRef.current = true;
      setStreamMutation({ stream: paramValid }).catch((err) =>
        console.error("Failed to persist stream:", err),
      );
    }
  }, [paramValid, user?.stream, setStreamMutation, setSearchParams]);

  const setStream = useCallback(
    async (id: StreamId) => {
      await setStreamMutation({ stream: id });
    },
    [setStreamMutation],
  );

  return { stream, setStream };
}
