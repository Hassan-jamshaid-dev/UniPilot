// Pair non-capsule radii with borderCurve: 'continuous'. Pills use `full`.
// UniPilot mockups use highly rounded "squircle" corners.
export const radius = {
  sm: 12,
  md: 16,
  lg: 22,
  /** Default Card corners. */
  xl: 28,
  /** Extra-soft surfaces (progress cards, search). */
  xxl: 32,
  full: 9999,
} as const;
