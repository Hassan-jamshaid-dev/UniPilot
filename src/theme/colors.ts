// UniPilot colour palette. Import from here instead of hard-coding hex values.
// Palette version bump: navy / cream / mustard (forces Metro to re-resolve this module).
export const PALETTE_ID = 'navy-cream-mustard-v2';

export const colors = {
  // Brand — deep navy (kept as `purple` so existing screens keep compiling)
  purple: '#0A192F',
  /** Primary brand navy — preferred new name; same value as `purple`. */
  primary: '#0A192F',
  /** Softened navy for secondary fills / hover. */
  primarySoft: '#1B2A4A',
  blue: '#1B2A4A',
  /** Mustard / gold accent — primary CTAs. */
  accent: '#E8AF50',
  /** Dark text sitting on mustard CTAs. */
  textOnAccent: '#0A192F',
  /** Navy track / divider sitting on mustard cards. */
  onAccentTrack: '#0A192F33',
  // Brand gradient (mustard depth for CTAs), always top-left -> bottom-right
  gradient: ['#E8AF50', '#D4A045'] as const,

  // Surfaces
  background: '#FDF8F0',
  /** Warm cream used behind Splash cream screens, Onboarding, and tabs. */
  backgroundSoft: '#FDF8F0',
  /** Near-white tile behind the brand mark. */
  tileSurface: '#FFFcf7',
  white: '#FFFFFF',
  /** Translucent whites for glassy surfaces on top of dark brand fills. */
  whiteAlpha18: '#FFFFFF2E',
  whiteAlpha25: '#FFFFFF40',

  // Text
  textPrimary: '#0A192F',
  /** textPrimary at ~30% — modal backdrops. */
  scrim: '#0A192F4D',
  textSecondary: '#5C6B7A',
  /** TextInput placeholder text. */
  placeholder: '#9AA5B1',
  /** Counters and field hints sitting below inputs. */
  muted: '#5C6B7A',

  // Lines and fills
  /** Hairline separators: tab bar top border, InsightRow dividers, ScoreRing track. */
  hairline: '#E8E2D6',
  /** Inactive tab icon/label tint on navy tab bar. */
  tabInactive: '#8A93A0',
  /** Inactive tab tint when the bar itself is navy. */
  tabInactiveOnNavy: '#FFFFFF99',
  /** Small chevron / disclosure glyphs on list rows. */
  chevron: '#A8B0BA',
  /** Grey bars in the faded placeholder behind LockedCard. */
  skeleton: '#E8E2D6',

  // Navy accents (light) — keys kept as purple* for existing imports
  /** Pale navy fill behind brand icons (icon tiles, lock circles). */
  purpleTint: '#E8EEF5',
  /** Pale navy outline for pill buttons. */
  purpleBorder: '#C5D0DE',
  /** Alias preferred name for pale brand fill. */
  primaryTint: '#E8EEF5',
  /** Soft mustard wash for accent chips. */
  accentTint: '#FBF0D9',

  // Controls
  /** Cream-surface progress / ScoreRing track (visible on soft backgrounds). */
  progressTrack: '#E8E2D6',
  /** Splash progress-bar track on navy. */
  splashProgressTrack: '#FFFFFF33',
  /** Flat fill for a disabled GradientButton. */
  buttonDisabled: '#C5CBD4',

  // Status colours — teal success (not forest-brand green)
  success: '#0F766E',
  warning: '#E8AF50',
  danger: '#EF4444',

  // Paywall (dark screen — navy depth)
  paywallTop: '#06101F',
  paywallBottom: '#0A192F',
  paywallCard: '#FFFFFF14',
  paywallCardSelected: '#FFFFFF29',
  paywallMuted: '#FFFFFFB8',
  paywallLine: '#FFFFFF26',

  // Brand mark (UniPilot U + plane)
  mark: {
    navy: '#0A192F',
    navySoft: '#1B2A4A',
    accent: '#E8AF50',
    // Legacy keys remapped so older gradient stops still resolve
    forest: '#0A192F',
    green: '#1B2A4A',
    violet: '#0A192F',
    purple: '#1B2A4A',
    blue: '#1B2A4A',
    sky: '#2A3F63',
  },

  // Decorative shapes on Splash / Onboarding / corner curves
  decor: {
    navy: '#0A192F',
    navySoft: '#1B2A4A',
    ochre: '#E8AF50',
    ochreSoft: '#F0C56E',
    cream: '#FDF8F0',
    mist: '#D6DEE8',
    glow: '#EEF2F8',
    ribbon: '#C5D0DE',
    ribbonLight: '#D6DEE8',
    ribbonClear: '#C5D0DE00',
    ribbonLightClear: '#D6DEE800',
    line: '#C5D0DE',
    orbit: '#8A93A0',
    sparkle: '#E8AF50',
    dot: '#1B2A4A',
    sphereLight: '#8A93A0',
    // Legacy names remapped away from violet / forest green
    forest: '#0A192F',
    forestSoft: '#1B2A4A',
    periwinkle: '#D6DEE8',
    lavender: '#E8EEF5',
    ice: '#EEF2F8',
  },
};
