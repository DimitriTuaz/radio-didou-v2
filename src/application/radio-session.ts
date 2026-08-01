import {
  confirmPlayback,
  IDLE_SESSION,
  requestPlayback,
  stopPlayback,
  withMuteToggled,
  withVolume,
  type ListeningSession,
} from "@/domain/listening-session";
import type { AudioOutput } from "@/domain/ports/audio-output";
import type { Station } from "@/domain/station";

/**
 * The use cases a listener can trigger, plus a subscription so any UI can
 * follow the resulting state. No React here on purpose: this is the piece that
 * would survive a move to another view layer.
 */
export type RadioSession = {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => ListeningSession;
  getInitialSnapshot: () => ListeningSession;
  play: () => void;
  stop: () => void;
  toggleMute: () => void;
  changeVolume: (value: number) => void;
  dispose: () => void;
};

export function createRadioSession(station: Station, output: AudioOutput): RadioSession {
  let session = IDLE_SESSION;
  const subscribers = new Set<() => void>();

  function commit(next: ListeningSession): void {
    if (next === session) {
      return;
    }
    session = next;
    for (const notify of subscribers) {
      notify();
    }
  }

  const unsubscribeFromOutput = output.subscribe({
    onPlaying: () => commit(confirmPlayback(session)),
    onFailure: () => commit(stopPlayback(session)),
  });

  return {
    subscribe(onChange) {
      subscribers.add(onChange);
      return () => {
        subscribers.delete(onChange);
      };
    },

    getSnapshot: () => session,

    /** Server render and first client render both start from an idle radio. */
    getInitialSnapshot: () => IDLE_SESSION,

    play() {
      const next = requestPlayback(session);
      if (next === session) {
        return;
      }
      output.changeVolume(next.volume);
      output.changeMuted(next.muted);
      output.play(station.streamUrl);
      commit(next);
    },

    stop() {
      output.stop();
      commit(stopPlayback(session));
    },

    toggleMute() {
      const next = withMuteToggled(session);
      output.changeMuted(next.muted);
      commit(next);
    },

    changeVolume(value) {
      const next = withVolume(session, value);
      output.changeVolume(next.volume);
      output.changeMuted(next.muted);
      commit(next);
    },

    dispose() {
      unsubscribeFromOutput();
      output.dispose();
      subscribers.clear();
    },
  };
}
