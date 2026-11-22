import { StyleSheet, View } from 'react-native';

import { Blob } from '@/components/decor/Blob';
import { CornerBlobs } from '@/components/decor/CornerBlobs';
import { colors } from '@/theme/colors';

export type PaywallDecorProps = {
  width: number;
  height: number;
};

/**
 * Soft atmosphere behind the Premium paywall — navy depth + mustard glow.
 */
export function PaywallDecor({ width: w, height: h }: PaywallDecorProps) {
  return (
    <View
      style={[styles.layer, { height: h }]}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
    >
      <CornerBlobs corners={['topLeft', 'bottomRight']} size={Math.round(w * 0.4)} />
      <Blob
        cx={0.15 * w}
        cy={0.18 * h}
        width={0.85 * w}
        height={0.4 * w}
        color={colors.decor.ochre}
        opacity={0.12}
        rotate={-28}
      />
      <Blob
        cx={0.75 * w}
        cy={0.42 * h}
        width={0.7 * w}
        height={0.5 * w}
        color={colors.decor.navySoft}
        opacity={0.18}
        rotate={16}
      />
      <Blob cx={0.5 * w} cy={0.16 * h} width={0.85 * w} color={colors.decor.glow} opacity={0.12} />
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
