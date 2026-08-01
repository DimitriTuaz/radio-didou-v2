"use client";

import { useRadioSession } from "@/presentation/providers/radio-session-provider";

/**
 * Vertical slider, hidden on touch layouts where v1 already hid it.
 * The input is laid out horizontally then rotated, which every browser renders
 * consistently — unlike a natively vertical range input.
 */
export function VolumeControl() {
  const { session, changeVolume } = useRadioSession();

  return (
    <div className="grid h-32 w-14 place-items-center portrait:hidden">
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={session.volume}
        onChange={(event) => changeVolume(event.currentTarget.valueAsNumber)}
        aria-label="Volume"
        className="volume-slider w-32 -rotate-90"
      />
    </div>
  );
}
