import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/theme/colors';

export type SplashDecorProps = {
  width: number;
  height: number;
};

/**
 * Splash atmosphere on deep navy: soft gold glow, swoosh ribbons, and a
 * faint crest watermark — matches the navy / mustard mockup splash beat.
 */
export function SplashDecor({ width: w, height: h }: SplashDecorProps) {
  const crestSize = Math.min(w * 0.92, 360);
  const crestTop = h * 0.42;

  return (
    <View style={styles.layer} pointerEvents="none" importantForAccessibility="no-hide-descendants">
      {/* Soft mustard glow behind the brand */}
      <View
        style={[
          styles.glow,
          {
            top: h * 0.18,
            left: w * 0.18,
            width: w * 0.64,
            height: h * 0.28,
          },
        ]}
      />

      {/* Top-right gold swoosh */}
      <Svg
        width={w * 0.55}
        height={h * 0.22}
        viewBox="0 0 220 120"
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Path
          d="M40 0 C90 18 140 8 220 36 L220 0 Z"
          fill={colors.accent}
          opacity={0.55}
        />
        <Path
          d="M80 0 C120 22 160 14 220 48 L220 0 Z"
          fill={colors.decor.ochreSoft}
          opacity={0.35}
        />
      </Svg>

      {/* Bottom-left navy depth + mustard tip */}
      <Svg
        width={w * 0.5}
        height={h * 0.28}
        viewBox="0 0 200 160"
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      >
        <Path
          d="M0 160 L0 48 C36 72 70 110 110 160 Z"
          fill={colors.primarySoft}
          opacity={0.9}
        />
        <Path
          d="M0 160 L0 88 C28 104 52 128 78 160 Z"
          fill={colors.accent}
          opacity={0.45}
        />
      </Svg>

      {/* Faint crest watermark */}
      <View
        style={[
          styles.crestWrap,
          {
            top: crestTop,
            width: crestSize,
            height: crestSize,
            left: (w - crestSize) / 2,
          },
        ]}
      >
        <Svg width={crestSize} height={crestSize} viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="crestRing" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={colors.accent} stopOpacity="0.18" />
              <Stop offset="1" stopColor={colors.white} stopOpacity="0.06" />
            </LinearGradient>
          </Defs>
          <Circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="url(#crestRing)"
            strokeWidth={2.5}
          />
          <Circle
            cx="100"
            cy="100"
            r="62"
            fill="none"
            stroke={colors.white}
            strokeOpacity={0.08}
            strokeWidth={1.5}
          />
          <Ellipse cx="100" cy="86" rx="28" ry="34" fill={colors.white} opacity={0.05} />
          <Path
            d="M72 118 C82 132 118 132 128 118"
            fill="none"
            stroke={colors.accent}
            strokeOpacity={0.16}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: colors.accent,
    opacity: 0.1,
  },
  crestWrap: {
    position: 'absolute',
  },
});
