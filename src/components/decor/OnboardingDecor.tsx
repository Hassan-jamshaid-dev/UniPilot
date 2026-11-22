import { StyleSheet, View } from 'react-native';

import { Blob } from '@/components/decor/Blob';
import { CornerBlobs } from '@/components/decor/CornerBlobs';
import { colors } from '@/theme/colors';

export type OnboardingDecorProps = {
  /** Screen width. */
  width: number;
  /** Height of the hero area (top part of the screen) the decoration lives in. */
  heroHeight: number;
  /** Vertical centre of the brand mark inside the hero. */
  markCenterY: number;
};

/**
 * Get Started background: organic corner curves + soft glow behind the mark
 * (cream field, navy + mustard accents).
 */
export function OnboardingDecor({ width: w, heroHeight: hh, markCenterY: cy }: OnboardingDecorProps) {
  const cx = w / 2;

  return (
    <View style={[styles.layer, { height: Math.max(hh, cy + 140) }]}>
      <CornerBlobs corners={['topLeft', 'bottomRight']} size={Math.round(w * 0.55)} />

      <Blob
        cx={0.06 * w}
        cy={0.22 * hh}
        width={0.55 * w}
        height={0.48 * w}
        rotate={-32}
        opacity={0.4}
        color={colors.decor.navy}
      />
      <Blob
        cx={0.0 * w}
        cy={0.32 * hh}
        width={0.38 * w}
        height={0.34 * w}
        rotate={8}
        opacity={0.8}
        color={colors.decor.ochre}
      />
      <Blob
        cx={1.08 * w}
        cy={0.55 * hh}
        width={0.5 * w}
        height={0.62 * w}
        rotate={-12}
        opacity={0.28}
        color={colors.decor.navySoft}
      />
      <Blob cx={cx} cy={cy} width={0.78 * w} color={colors.decor.glow} opacity={0.75} />
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
});
