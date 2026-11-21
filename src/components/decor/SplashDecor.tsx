import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { CornerBlobs } from '@/components/decor/CornerBlobs';
import { colors } from '@/theme/colors';

export type SplashDecorProps = {
  width: number;
  height: number;
};

/**
 * Splash atmosphere: organic corner curves plus a soft landscape silhouette
 * (mountain / sunrise vibe) behind the brand — no fake university content.
 */
export function SplashDecor({ width: w, height: h }: SplashDecorProps) {
  const artW = Math.min(w * 0.92, 360);
  const artH = artW * 0.55;
  const artTop = h * 0.52;

  return (
    <View style={styles.layer} pointerEvents="none" importantForAccessibility="no-hide-descendants">
      <CornerBlobs corners={['topLeft', 'bottomRight']} size={Math.round(w * 0.42)} />

      <View style={[styles.heroArt, { top: artTop, width: artW, height: artH, left: (w - artW) / 2 }]}>
        <Svg width={artW} height={artH} viewBox="0 0 360 200">
          <Defs>
            <LinearGradient id="splashSky" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.accent} stopOpacity="0.35" />
              <Stop offset="0.45" stopColor={colors.decor.ochreSoft} stopOpacity="0.2" />
              <Stop offset="1" stopColor={colors.backgroundSoft} stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id="splashHill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.primarySoft} />
              <Stop offset="1" stopColor={colors.primary} />
            </LinearGradient>
          </Defs>
          <Circle cx="180" cy="78" r="42" fill="url(#splashSky)" />
          <Circle cx="180" cy="78" r="22" fill={colors.accent} opacity={0.55} />
          <Path
            d="M0 200 L40 140 C70 110 95 95 120 100 C150 106 170 130 200 125 C230 120 250 95 280 105 C310 115 330 145 360 170 L360 200 Z"
            fill="url(#splashHill)"
            opacity={0.88}
          />
          <Path
            d="M0 200 L60 160 C90 140 110 135 140 145 C175 158 195 175 230 168 C260 162 290 145 360 155 L360 200 Z"
            fill={colors.primary}
            opacity={0.55}
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
  heroArt: {
    position: 'absolute',
  },
});
