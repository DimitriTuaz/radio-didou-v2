"use client";

import { createContext, use, useEffect, useState, useSyncExternalStore } from "react";

import { createRadioSession, type RadioSession } from "@/application/radio-session";
import type { ListeningSession } from "@/domain/listening-session";
import type { Station } from "@/domain/station";
import { createHtmlAudioOutput } from "@/infrastructure/audio/html-audio-output";

const RadioSessionContext = createContext<RadioSession | undefined>(undefined);

/**
 * The composition root of the browser side: the only place where a use case
 * meets a concrete adapter. Everything below it depends on abstractions.
 */
export function RadioSessionProvider({
  station,
  children,
}: {
  station: Station;
  children: React.ReactNode;
}) {
  const [session] = useState(() => createRadioSession(station, createHtmlAudioOutput()));

  useEffect(() => () => session.dispose(), [session]);

  return <RadioSessionContext value={session}>{children}</RadioSessionContext>;
}

export function useRadioSession(): {
  session: ListeningSession;
  play: () => void;
  stop: () => void;
  toggleMute: () => void;
  changeVolume: (value: number) => void;
} {
  const radioSession = use(RadioSessionContext);
  if (!radioSession) {
    throw new Error("useRadioSession must be used inside a <RadioSessionProvider>.");
  }

  const session = useSyncExternalStore(
    radioSession.subscribe,
    radioSession.getSnapshot,
    radioSession.getInitialSnapshot,
  );

  return {
    session,
    play: radioSession.play,
    stop: radioSession.stop,
    toggleMute: radioSession.toggleMute,
    changeVolume: radioSession.changeVolume,
  };
}
