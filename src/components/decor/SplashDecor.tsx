import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop } from 'react-native-svg';

import { CornerBlobs } from '@/components/decor/CornerBlobs';
import { colors } from '@/theme/colors';

export type SplashDecorProps = {
  width: number;
  height: number;
};

/**
 * Splash atmosphere: cream sky, sunset glow, layered mountain peaks, and a
 * small hiker silhouette — the bottom-right mockup vibe (no university content).
 */
export function SplashDecor({ width: w, height: h }: SplashDecorProps) {
  const artW = Math.min(w * 1.05, 420);
  const artH = Math.min(h * 0.58, artW * 0.78);
  const artTop = h * 0.38;

  return (
    <View style={styles.layer} pointerEvents="none" importantForAccessibility="no-hide-descendants">
      <CornerBlobs corners={['topLeft', 'bottomRight']} size={Math.round(w * 0.44)} />

      {/* Soft sunset wash behind the peaks */}
      <View style={[styles.glow, { top: h * 0.28, left: w * 0.12, width: w * 0.76, height: h * 0.32 }]} />

      <View style={[styles.heroArt, { top: artTop, width: artW, height: artH, left: (w - artW) / 2 }]}>
        <Svg width={artW} height={artH} viewBox="0 0 400 280">
          <Defs>
            <LinearGradient id="splashSky" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.accent} stopOpacity="0.42" />
              <Stop offset="0.4" stopColor={colors.decor.ochreSoft} stopOpacity="0.22" />
              <Stop offset="1" stopColor={colors.backgroundSoft} stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id="splashFar" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.primarySoft} stopOpacity="0.55" />
              <Stop offset="1" stopColor={colors.primary} stopOpacity="0.75" />
            </LinearGradient>
            <LinearGradient id="splashNear" x1="0" y1="0" x2="0.2" y2="1">
              <Stop offset="0" stopColor={colors.primarySoft} />
              <Stop offset="1" stopColor={colors.primary} />
            </LinearGradient>
          </Defs>

          {/* Sun / glow */}
          <Circle cx="200" cy="88" r="68" fill="url(#splashSky)" />
          <Circle cx="200" cy="92" r="28" fill={colors.accent} opacity={0.65} />
          <Circle cx="200" cy="92" r="14" fill={colors.decor.ochreSoft} opacity={0.9} />

          {/* Soft cloud wisps */}
          <Ellipse cx="72" cy="70" rx="36" ry="14" fill={colors.white} opacity={0.45} />
          <Ellipse cx="98" cy="66" rx="22" ry="11" fill={colors.tileSurface} opacity={0.5} />
          <Ellipse cx="320" cy="78" rx="40" ry="15" fill={colors.white} opacity={0.4} />
          <Ellipse cx="348" cy="74" rx="24" ry="11" fill={colors.accentTint} opacity={0.55} />

          {/* Far ridge */}
          <Path
            d="M0 280 L0 190 C40 155 70 140 110 148 C150 156 175 185 210 178 C250 170 280 140 320 150 C355 158 380 185 400 210 L400 280 Z"
            fill="url(#splashFar)"
            opacity={0.55}
          />

          {/* Mid ridge */}
          <Path
            d="M0 280 L20 210 C55 175 85 155 125 162 C165 170 185 200 225 192 C270 182 295 150 340 165 C370 175 390 200 400 225 L400 280 Z"
            fill="url(#splashNear)"
            opacity={0.82}
          />

          {/* Near foothill */}
          <Path
            d="M0 280 L0 240 C50 220 90 215 140 228 C190 242 220 255 270 248 C320 240 360 230 400 242 L400 280 Z"
            fill={colors.primary}
            opacity={0.92}
          />

          {/* Winding trail */}
          <Path
            d="M168 268 C178 248 186 232 198 210 C208 192 214 178 222 158"
            fill="none"
            stroke={colors.tileSurface}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={0.55}
          />

          {/* Hiker silhouette near the peak */}
          <Path
            d="M224 152 C224 148 227 145 231 145 C235 145 238 148 238 152 C238 155 236 157 234 158 L236 172 L228 172 L230 158 C228 157 224 155 224 152 Z M228 172 L222 188 L228 188 L232 176 L236 188 L242 188 L236 172 Z"
            fill={colors.primary}
            opacity={0.95}
          />
          {/* Small flag on peak */}
          <Path d="M222 138 V118" stroke={colors.primary} strokeWidth={2.2} strokeLinecap="round" />
          <Path d="M222 118 L242 126 L222 134 Z" fill={colors.accent} />
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
    opacity: 0.12,
  },
  heroArt: {
    position: 'absolute',
  },
});
