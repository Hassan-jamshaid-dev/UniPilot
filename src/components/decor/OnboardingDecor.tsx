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
 * Get Started background: abstract green/orange fluid shapes + corner curves.
 */
export function OnboardingDecor({ width: w, heroHeight: hh, markCenterY: cy }: OnboardingDecorProps) {
  const cx = w / 2;

  return (
    <View style={[styles.layer, { height: Math.max(hh, cy + 120) }]}>
      <CornerBlobs corners={['topLeft', 'bottomLeft']} size={Math.round(w * 0.48)} />

      <Blob
        cx={0.08 * w}
        cy={0.18 * hh}
        width={0.7 * w}
        height={0.55 * w}
        rotate={-28}
        opacity={0.55}
        color={colors.decor.forest}
      />
      <Blob
        cx={0.02 * w}
        cy={0.28 * hh}
        width={0.42 * w}
        height={0.38 * w}
        rotate={12}
        opacity={0.85}
        color={colors.decor.ochre}
      />
      <Blob
        cx={1.05 * w}
        cy={0.42 * hh}
        width={0.55 * w}
        height={0.7 * w}
        rotate={-18}
        opacity={0.35}
        color={colors.decor.forestSoft}
      />
      <Blob cx={cx} cy={cy} width={0.75 * w} color={colors.decor.glow} opacity={0.7} />
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
