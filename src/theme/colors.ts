// UniPilot colour palette. Import from here instead of hard-coding hex values.
export const colors = {
  // Brand — deep forest green (kept as `purple` so existing screens keep compiling)
  purple: '#004225',
  /** Primary brand green — preferred new name; same value as `purple`. */
  primary: '#004225',
  /** Softened green for secondary fills / hover. */
  primarySoft: '#0A5C38',
  blue: '#0A5C38',
  /** Muted earthy orange / ochre accent. */
  accent: '#E07A2C',
  // Brand gradient (subtle green depth), always top-left -> bottom-right
  gradient: ['#004225', '#0A5C38'] as const,

  // Surfaces
  background: '#F5F2E8',
  /** Warm cream used behind Splash, Onboarding, and tabs. */
  backgroundSoft: '#F5F2E8',
  /** Near-white tile behind the brand mark. */
  tileSurface: '#FAF8F2',
  white: '#FFFFFF',
  /** Translucent whites for glassy surfaces on top of dark brand fills. */
  whiteAlpha18: '#FFFFFF2E',
  whiteAlpha25: '#FFFFFF40',

  // Text
  textPrimary: '#1A1D29',
  /** textPrimary at ~30% — modal backdrops. */
  scrim: '#1A1D294D',
  textSecondary: '#6B7280',
  /** TextInput placeholder text. */
  placeholder: '#9CA3AF',
  /** Counters and field hints sitting below inputs. */
  muted: '#6B7280',

  // Lines and fills
  /** Hairline separators: tab bar top border, InsightRow dividers, ScoreRing track. */
  hairline: '#E8E4D9',
  /** Inactive tab icon/label tint, and the "neutral" insight dot. */
  tabInactive: '#8B9080',
  /** Small chevron / disclosure glyphs on list rows. */
  chevron: '#B0B5A8',
  /** Grey bars in the faded placeholder behind LockedCard. */
  skeleton: '#E4E0D4',

  // Green accents (light) — keys kept as purple* for existing imports
  /** Pale green fill behind brand icons (icon tiles, lock circles). */
  purpleTint: '#E4EDE6',
  /** Pale green outline for pill buttons. */
  purpleBorder: '#C5D4C9',
  /** Alias preferred name for pale brand fill. */
  primaryTint: '#E4EDE6',
  /** Soft orange wash for accent chips. */
  accentTint: '#F8E8D8',

  // Controls
  /** Splash progress-bar track. */
  progressTrack: '#E4E0D4',
  /** Flat fill for a disabled GradientButton. */
  buttonDisabled: '#B8C4B8',

  // Status colours (used by later screens, e.g. evaluation verdicts)
  success: '#0A7A4A',
  warning: '#E07A2C',
  danger: '#EF4444',

  // Paywall (dark screen — forest green depth instead of violet)
  paywallTop: '#002816',
  paywallBottom: '#004225',
  paywallCard: '#FFFFFF14',
  paywallCardSelected: '#FFFFFF29',
  paywallMuted: '#FFFFFFB8',
  paywallLine: '#FFFFFF26',

  // Brand mark (UniPilot U + plane)
  mark: {
    forest: '#004225',
    green: '#0A5C38',
    accent: '#E07A2C',
    // Legacy keys remapped so older gradient stops still resolve
    violet: '#004225',
    purple: '#0A5C38',
    blue: '#0A5C38',
    sky: '#1A7A4E',
  },

  // Decorative shapes on Splash / Onboarding / corner curves
  decor: {
    forest: '#004225',
    forestSoft: '#0A5C38',
    ochre: '#E07A2C',
    ochreSoft: '#F0A05A',
    cream: '#F5F2E8',
    mist: '#D9E5D8',
    glow: '#E8F0E6',
    ribbon: '#C5D4C9',
    ribbonLight: '#D9E5D8',
    ribbonClear: '#C5D4C900',
    ribbonLightClear: '#D9E5D800',
    line: '#C5D4C9',
    orbit: '#A8BFAE',
    sparkle: '#E07A2C',
    dot: '#0A5C38',
    sphereLight: '#A8BFAE',
    // Legacy pastel names remapped away from violet
    periwinkle: '#D9E5D8',
    lavender: '#E4EDE6',
    ice: '#E8F0E6',
  },
};
