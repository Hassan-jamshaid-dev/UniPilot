import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientButton } from '@/components/GradientButton';
import { OnboardingDecor } from '@/components/decor/OnboardingDecor';
import { VMark } from '@/components/VMark';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const MARK_SIZE = 128;
const CTA_GROUP_HEIGHT = 56 + 8 + 18 + 16 + 20;
const MIN_TEXT_TO_CTA_GAP = 24;

// Get Started — cream field: logo, Plan. Apply. Achieve., mustard CTA.
export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const bottomPadding = Math.max(24, insets.bottom + 12);
  const topPadding = insets.top;
  const reserved = 120 + MIN_TEXT_TO_CTA_GAP + CTA_GROUP_HEIGHT + bottomPadding + topPadding;
  const heroHeight = Math.max(MARK_SIZE + 48, Math.min(height * 0.46, height - reserved));
  const markCenterY = heroHeight * 0.5;

  return (
    <View style={styles.screen}>
      <OnboardingDecor
        width={width}
        heroHeight={heroHeight + topPadding}
        markCenterY={markCenterY + topPadding}
      />

      <View style={{ height: topPadding }} />

      <View style={{ height: heroHeight }}>
        <VMark
          size={MARK_SIZE}
          style={[
            styles.mark,
            { top: markCenterY - MARK_SIZE / 2, left: (width - MARK_SIZE) / 2 },
          ]}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.wordmark} maxFontSizeMultiplier={1.2}>
          UniPilot
        </Text>
        <Text style={styles.tagline} maxFontSizeMultiplier={1.2}>
          Plan. Apply. Achieve.
        </Text>
        <View style={styles.accentRule} />
      </View>

      <View style={styles.spacer} />

      <View style={[styles.cta, { paddingBottom: bottomPadding }]}>
        <GradientButton
          label="Get Started"
          onPress={() => router.push('/goal')}
          trailingIcon={<Ionicons name="arrow-forward" size={18} color={colors.textOnAccent} />}
        />
        <Text style={styles.guestHint} maxFontSizeMultiplier={1.3}>
          No account needed.
        </Text>

        <View style={styles.loginRow}>
          <Pressable
            onPress={() => router.push('/signup')}
            hitSlop={8}
            accessibilityRole="link"
            accessibilityLabel="I already have an account"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.loginLink} maxFontSizeMultiplier={1.3}>
              I already have an account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  mark: {
    position: 'absolute',
  },
  copy: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: fonts.serifBold,
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    color: colors.primary,
    marginBottom: 14,
  },
  tagline: {
    fontFamily: fonts.serifRegular,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  accentRule: {
    marginTop: 14,
    width: 56,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  spacer: {
    flex: 1,
    minHeight: MIN_TEXT_TO_CTA_GAP,
  },
  cta: {
    paddingHorizontal: 24,
  },
  guestHint: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    minHeight: 20,
  },
  loginLink: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.accent,
  },
  pressed: {
    opacity: 0.6,
  },
});
