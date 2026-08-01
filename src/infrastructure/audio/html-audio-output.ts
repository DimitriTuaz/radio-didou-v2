import type { AudioOutput, AudioOutputEvents } from "@/domain/ports/audio-output";

/**
 * `AudioOutput` backed by an `HTMLAudioElement`.
 *
 * The element is created on first use rather than up front: the session is
 * built during render, and touching `Audio` there would break server rendering
 * and leak an element on every Strict Mode double render.
 */
export function createHtmlAudioOutput(): AudioOutput {
  const subscribers = new Set<AudioOutputEvents>();
  let element: HTMLAudioElement | undefined;
  let volume = 1;
  let muted = false;

  function notifyPlaying(): void {
    for (const subscriber of subscribers) {
      subscriber.onPlaying();
    }
  }

  function notifyFailure(): void {
    for (const subscriber of subscribers) {
      subscriber.onFailure();
    }
  }

  function getElement(): HTMLAudioElement {
    if (!element) {
      element = new Audio();
      element.preload = "none";
      element.volume = volume;
      element.muted = muted;
      element.addEventListener("playing", notifyPlaying);
      element.addEventListener("error", notifyFailure);
    }
    return element;
  }

  function release(): void {
    if (!element) {
      return;
    }
    element.pause();
    element.removeAttribute("src");
    // Drops whatever is buffered, so the next play reconnects at the live edge
    // instead of resuming minutes-old audio.
    element.load();
  }

  return {
    play(streamUrl) {
      const audio = getElement();
      audio.src = streamUrl;
      audio.load();
      audio.play().catch(notifyFailure);
    },

    stop: release,

    changeVolume(value) {
      volume = value;
      if (element) {
        element.volume = value;
      }
    },

    changeMuted(nextMuted) {
      muted = nextMuted;
      if (element) {
        element.muted = nextMuted;
      }
    },

    subscribe(events) {
      subscribers.add(events);
      return () => {
        subscribers.delete(events);
      };
    },

    dispose() {
      element?.removeEventListener("playing", notifyPlaying);
      element?.removeEventListener("error", notifyFailure);
      release();
      element = undefined;
      subscribers.clear();
    },
  };
}
