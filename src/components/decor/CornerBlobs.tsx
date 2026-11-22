import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme/colors';

export type CornerBlobsProps = {
  /** Which corners get the organic navy + mustard curves. */
  corners?: Array<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>;
  /** Scale of each blob cluster (default 140). */
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Organic curved corner decorations from the UniPilot mockups —
 * overlapping navy and mustard fluid shapes.
 */
export function CornerBlobs({
  corners = ['topLeft', 'bottomRight'],
  size = 140,
  style,
}: CornerBlobsProps) {
  return (
    <View
      pointerEvents="none"
      importantForAccessibility="no-hide-descendants"
      style={[styles.layer, style]}
    >
      {corners.includes('topLeft') ? (
        <View style={[styles.cluster, { top: 0, left: 0, width: size, height: size }]}>
          <BlobSvg size={size} variant="topLeft" />
        </View>
      ) : null}
      {corners.includes('topRight') ? (
        <View style={[styles.cluster, { top: 0, right: 0, width: size, height: size }]}>
          <BlobSvg size={size} variant="topRight" />
        </View>
      ) : null}
      {corners.includes('bottomLeft') ? (
        <View style={[styles.cluster, { bottom: 0, left: 0, width: size, height: size }]}>
          <BlobSvg size={size} variant="bottomLeft" />
        </View>
      ) : null}
      {corners.includes('bottomRight') ? (
        <View style={[styles.cluster, { bottom: 0, right: 0, width: size, height: size }]}>
          <BlobSvg size={size} variant="bottomRight" />
        </View>
      ) : null}
    </View>
  );
}

function BlobSvg({
  size,
  variant,
}: {
  size: number;
  variant: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}) {
  const flipX = variant === 'topRight' || variant === 'bottomRight' ? -1 : 1;
  const flipY = variant === 'bottomLeft' || variant === 'bottomRight' ? -1 : 1;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      style={{ transform: [{ scaleX: flipX }, { scaleY: flipY }] }}
    >
      {/* Outer navy curve */}
      <Path
        d="M0 0 H92 C78 28 74 52 58 78 C40 106 18 122 0 132 Z"
        fill={colors.decor.navy}
        opacity={0.92}
      />
      {/* Inner mustard accent curve */}
      <Path
        d="M0 0 H48 C42 22 38 40 28 58 C16 80 6 96 0 108 Z"
        fill={colors.decor.ochre}
        opacity={0.95}
      />
      {/* Soft navy overlap tip */}
      <Path
        d="M0 72 C18 70 34 58 44 40 C36 58 22 72 0 78 Z"
        fill={colors.decor.navySoft}
        opacity={0.55}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  cluster: {
    position: 'absolute',
  },
});
