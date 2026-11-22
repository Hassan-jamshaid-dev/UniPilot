import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';

/**
 * UniPilot brand mark: a stylized "U" with a mustard paper-plane motif
 * flying through the upper-right opening.
 */

export type VMarkProps = {
  /** Rendered width and height, in px. */
  size: number;
  /**
   * `brand` — navy U on cream surfaces.
   * `onDark` — white U for navy splash / paywall backgrounds.
   */
  tone?: 'brand' | 'onDark';
  style?: StyleProp<ViewStyle>;
};

/** The U + plane mark with no background; sits directly on whatever is behind it. */
export function VMark({ size, tone = 'brand', style }: VMarkProps) {
  const gradientId = `upmark-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const stemStart = tone === 'onDark' ? colors.white : colors.mark.navySoft;
  const stemEnd = tone === 'onDark' ? colors.white : colors.mark.navy;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={style}
      accessibilityRole="image"
      accessibilityLabel="UniPilot"
    >
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={stemStart} />
          <Stop offset="1" stopColor={stemEnd} />
        </LinearGradient>
      </Defs>
      {/* U stem — left */}
      <Path
        d="M22 14 C22 14 22 62 22 68 C22 82 32 90 50 90 C68 90 78 82 78 68 L78 42"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mustard paper plane */}
      <Path
        d="M70 18 L94 28 L78 36 L74 48 Z"
        fill={colors.accent}
      />
      <Path
        d="M70 18 L78 36 L74 30 Z"
        fill={colors.decor.ochreSoft}
        opacity={0.85}
      />
    </Svg>
  );
}

export type VMarkTileProps = {
  /** Width and height of the rounded square, in px. */
  size: number;
  style?: StyleProp<ViewStyle>;
};

/** The mark inside a near-white rounded tile with a soft shadow (tab headers etc.). */
export function VMarkTile({ size, style }: VMarkTileProps) {
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          borderCurve: 'continuous',
        },
        style,
      ]}
    >
      <VMark size={Math.round(size * 0.72)} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.tileSurface,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadows.card,
  },
});
