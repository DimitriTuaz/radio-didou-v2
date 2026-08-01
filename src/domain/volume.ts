declare const volumeBrand: unique symbol;

/**
 * A volume is a number between 0 and 1 that went through `createVolume`.
 * The brand makes an unchecked number unassignable, so clamping cannot be skipped.
 */
export type Volume = number & { readonly [volumeBrand]: true };

export const SILENT = 0 as Volume;
export const FULL = 1 as Volume;

/** Above this, the speaker is drawn with all its waves. */
const LOUD_THRESHOLD = 0.5;

export function createVolume(value: number): Volume {
  if (!Number.isFinite(value)) {
    throw new Error(`"${value}" is not a usable volume.`);
  }
  return Math.min(1, Math.max(0, value)) as Volume;
}

export function isSilent(volume: Volume): boolean {
  return volume === SILENT;
}

export function isLoud(volume: Volume): boolean {
  return volume > LOUD_THRESHOLD;
}
