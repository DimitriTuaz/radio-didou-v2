import { createVolume, FULL, isLoud, isSilent, type Volume } from "@/domain/volume";

export type PlaybackStatus = "stopped" | "connecting" | "playing";

/** Which speaker icon the listener should see. */
export type SpeakerLevel = "muted" | "low" | "high";

/**
 * Everything there is to know about one listener in front of the radio.
 * Every transition below is pure and returns the very same object when nothing
 * changed, so subscribers can compare by reference.
 */
export type ListeningSession = {
  readonly status: PlaybackStatus;
  readonly volume: Volume;
  readonly muted: boolean;
};

export const IDLE_SESSION: ListeningSession = Object.freeze({
  status: "stopped",
  volume: FULL,
  muted: false,
});

export function requestPlayback(session: ListeningSession): ListeningSession {
  if (session.status !== "stopped") {
    return session;
  }
  return { ...session, status: "connecting" };
}

export function confirmPlayback(session: ListeningSession): ListeningSession {
  if (session.status === "playing") {
    return session;
  }
  return { ...session, status: "playing" };
}

export function stopPlayback(session: ListeningSession): ListeningSession {
  if (session.status === "stopped") {
    return session;
  }
  return { ...session, status: "stopped" };
}

/**
 * Reaching for the slider means "let me hear it", so any volume above zero
 * lifts the mute the listener set earlier.
 */
export function withVolume(session: ListeningSession, value: number): ListeningSession {
  const volume = createVolume(value);
  const muted = session.muted && isSilent(volume);
  if (volume === session.volume && muted === session.muted) {
    return session;
  }
  return { ...session, volume, muted };
}

export function withMuteToggled(session: ListeningSession): ListeningSession {
  return { ...session, muted: !session.muted };
}

export function isConnecting(session: ListeningSession): boolean {
  return session.status === "connecting";
}

export function isPlaying(session: ListeningSession): boolean {
  return session.status === "playing";
}

export function speakerLevel(session: ListeningSession): SpeakerLevel {
  if (session.muted || isSilent(session.volume)) {
    return "muted";
  }
  return isLoud(session.volume) ? "high" : "low";
}
