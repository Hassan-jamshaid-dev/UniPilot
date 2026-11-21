import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter, type Href } from 'expo-router';
import { useCallback, useState, type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Card } from '@/components/Card';
import { GradientButton } from '@/components/GradientButton';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SoftSkeleton } from '@/components/SoftSkeleton';
import { VMark } from '@/components/VMark';
import { CornerBlobs } from '@/components/decor/CornerBlobs';
import { HomeHeroArt } from '@/components/decor/HomeHeroArt';
import { fetchRemoteEvaluations } from '@/services/evaluationCloud';
import { colorForScore } from '@/services/score';
import { firstNameOf, getAccount, getIsSignedIn } from '@/storage/authStorage';
import { getHistory, mergeRemoteHistory } from '@/storage/historyStorage';
import { getDisplayName } from '@/storage/nameStorage';
import { getIsPremium } from '@/storage/premiumStorage';
import { FREE_DAILY_LIMIT, getRemainingToday } from '@/storage/usageStorage';
import { setCurrentEvaluation } from '@/store/evaluationStore';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { fonts, type } from '@/theme/typography';
import { relativeTime } from '@/utils/relativeTime';
import type { Evaluation } from '@/types/evaluation';

const TAB_BAR_SPACER = 24;

function timeOfDayGreeting(): 'Good morning' | 'Good afternoon' | 'Good evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Dashboard Home. Evaluate lives on the stack at /evaluate so this tab can stay a hub.
export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const greeting = timeOfDayGreeting();
  const artSize = Math.round(Math.min(152, Math.max(112, width * 0.36)));

  const [hydrated, setHydrated] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [remainingFree, setRemainingFree] = useState<number | null>(null);
  const [recent, setRecent] = useState<Evaluation[]>([]);
  const [recentReady, setRecentReady] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [premium, signedIn, account, localName, history, remaining] = await Promise.all([
          getIsPremium(),
          getIsSignedIn(),
          getAccount(),
          getDisplayName(),
          getHistory(),
          getRemainingToday(),
        ]);
        if (cancelled) return;
        setIsPremium(premium);
        setRemainingFree(remaining);
        const fromAccount = signedIn && account ? firstNameOf(account.name).trim() : '';
        const fromLocal = localName ? firstNameOf(localName).trim() : '';
        setFirstName(fromAccount || fromLocal || null);
        setHydrated(true);
        if (!premium) {
          setRecent([]);
          setRecentReady(true);
          return;
        }
        setRecent(history.slice(0, 3));
        if (history.length > 0) setRecentReady(true);
        else setRecentReady(false);
        const remote = await fetchRemoteEvaluations();
        if (cancelled || !remote) {
          if (!cancelled) setRecentReady(true);
          return;
        }
        const merged = await mergeRemoteHistory(remote);
        if (!cancelled) {
          setRecent(merged.slice(0, 3));
          setRecentReady(true);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const openEvaluation = (evaluation: Evaluation) => {
    setCurrentEvaluation(evaluation);
    router.push('/results');
  };

  const showRecentSkeleton = isPremium === null || (isPremium === true && !recentReady);
  const showRecentList = isPremium === true && recentReady && recent.length > 0;
  const showEmptyRecent = !showRecentSkeleton && !showRecentList;

  const usedFree =
    remainingFree == null ? 0 : Math.max(0, FREE_DAILY_LIMIT - remainingFree);
  const progressLabel = isPremium
    ? 'Unlimited evaluations'
    : `${usedFree} / ${FREE_DAILY_LIMIT}`;
  const progressSub =
    isPremium === true
      ? 'Premium is active'
      : remainingFree === 0
        ? 'Free evaluations used today'
        : 'Free evaluations today';
  const progressRatio =
    isPremium === true
      ? 1
      : FREE_DAILY_LIMIT <= 0
        ? 0
        : Math.min(1, usedFree / FREE_DAILY_LIMIT);

  const greetingLine = firstName ? `Hi, ${firstName}!` : `${greeting}!`;

  return (
    <ScreenWrapper
      background={<CornerBlobs corners={['topLeft', 'bottomRight']} size={Math.round(width * 0.38)} />}
      chrome={
        <View style={styles.headerRow}>
          <VMark size={36} />
          <View style={styles.headerActions}>
            {isPremium === false ? (
              <Pressable
                onPress={() => router.push('/paywall')}
                accessibilityRole="button"
                accessibilityLabel="Upgrade"
                hitSlop={8}
                style={({ pressed }) => [styles.upgradeChip, pressed && styles.pressed]}
              >
                <CrownIcon size={14} color={colors.primary} />
                <Text style={styles.upgradeChipLabel}>Upgrade</Text>
              </Pressable>
            ) : null}
            <Pressable
              onPress={() => router.push('/settings')}
              accessibilityRole="button"
              accessibilityLabel="Settings"
              style={({ pressed }) => [styles.settingsBtn, pressed && styles.pressed]}
            >
              <Ionicons name="settings-outline" size={24} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      }
      contentContainerStyle={[styles.content, { paddingBottom: TAB_BAR_SPACER }]}
    >

      <View style={[styles.heroRow, { minHeight: artSize - 4 }]}>
        <View style={[styles.heroCopy, { paddingRight: Math.round(artSize * 0.42) }]}>
          {!hydrated ? (
            <View style={styles.heroSkeleton}>
              <SoftSkeleton height={18} style={styles.greetingSkeleton} />
              <SoftSkeleton height={36} style={styles.headlineSkeleton} />
              <SoftSkeleton height={36} style={styles.headlineSkeletonShort} />
            </View>
          ) : (
            <>
              <Text style={styles.hi}>{greetingLine}</Text>
              <Text style={styles.tagline}>Plan. Apply. Achieve.</Text>
              <View style={styles.accentRule} />
            </>
          )}
        </View>
        <View style={styles.heroArt} pointerEvents="none">
          <HomeHeroArt size={artSize} />
        </View>
      </View>

      <Pressable
        onPress={() =>
          isPremium === false ? router.push('/paywall') : router.navigate('/(tabs)/history')
        }
        accessibilityRole="button"
        accessibilityLabel="Your evaluation progress"
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={styles.progressCard}>
          <View style={styles.progressCopy}>
            <Text style={styles.progressTitle}>Your evaluation progress</Text>
            <Text style={styles.progressCount}>{progressLabel}</Text>
            <Text style={styles.progressSub}>{progressSub}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progressRatio * 100)}%` }]} />
            </View>
          </View>
          <View style={styles.progressDivider} />
          <Text style={styles.progressLink}>
            {isPremium === false ? 'Upgrade →' : 'View All →'}
          </Text>
        </View>
      </Pressable>

      <GradientButton
        label="Evaluate an opportunity"
        onPress={() => router.push('/evaluate')}
        icon={<Ionicons name="sparkles" size={16} color={colors.white} />}
        trailingIcon={<Ionicons name="arrow-forward" size={18} color={colors.white} />}
      />

      <Pressable
        onPress={() => router.navigate('/(tabs)/profile')}
        accessibilityRole="button"
        accessibilityLabel="Your profile"
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <Card radius={radius.xl} padding={16}>
          <View style={styles.row}>
            <IconCircle>
              <Ionicons name="person-outline" size={22} color={colors.primary} />
            </IconCircle>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Your profile</Text>
              <Text style={styles.rowSubtitle}>Goals, target universities, career & more</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.chevron} />
          </View>
        </Card>
      </Pressable>

      <View style={styles.recentSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Recent evaluations</Text>
          <Pressable
            onPress={() => router.navigate('/(tabs)/history')}
            accessibilityRole="button"
            accessibilityLabel="View all evaluations"
            hitSlop={8}
            style={({ pressed }) => [styles.viewAll, pressed && styles.pressed]}
          >
            <Text style={styles.viewAllLabel}>See All →</Text>
          </Pressable>
        </View>

        {showRecentSkeleton ? (
          <View style={styles.skeletonStack}>
            <SoftSkeleton height={88} />
            <SoftSkeleton height={88} />
          </View>
        ) : null}

        {showRecentList ? (
          <View style={styles.recentList}>
            {recent.map((item) => (
              <RecentRow key={item.id} evaluation={item} onPress={() => openEvaluation(item)} />
            ))}
          </View>
        ) : null}

        {showEmptyRecent ? (
          <Card radius={radius.xl} padding={16}>
            <View style={styles.row}>
              <IconCircle>
                {isPremium === false ? (
                  <Ionicons name="lock-closed" size={20} color={colors.primary} />
                ) : (
                  <DocStarIcon size={22} color={colors.primary} />
                )}
              </IconCircle>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>
                  {isPremium === false ? 'History is Premium' : 'No evaluations yet'}
                </Text>
                <Text style={styles.rowSubtitle}>
                  {isPremium === false
                    ? 'Free evaluations are not saved here. Upgrade to keep a History list.'
                    : 'Start by evaluating an opportunity to see your results here.'}
                </Text>
              </View>
            </View>
          </Card>
        ) : null}
      </View>

      <Pressable
        onPress={() => router.push('/help' as Href)}
        accessibilityRole="button"
        accessibilityLabel="Quick tip. How to use UniPilot."
        style={({ pressed }) => [styles.tipPress, pressed && styles.pressed]}
      >
        <Card radius={radius.xl} padding={16}>
          <View style={styles.row}>
            <IconCircle>
              <Ionicons name="bulb-outline" size={22} color={colors.primary} />
            </IconCircle>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Quick tip</Text>
              <Text style={styles.rowSubtitle}>
                How to write a goal, evaluate an opportunity, and what Premium adds.
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={colors.chevron} />
          </View>
        </Card>
      </Pressable>
    </ScreenWrapper>
  );
}

function RecentRow({
  evaluation,
  onPress,
}: {
  evaluation: Evaluation;
  onPress: () => void;
}) {
  const tint = colorForScore(evaluation.score);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={evaluation.title}>
      {({ pressed }) => (
        <Card radius={radius.xl} padding={16} style={pressed ? styles.rowPressed : undefined}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle} numberOfLines={1}>
                {evaluation.title}
              </Text>
              <Text style={styles.recentMeta} numberOfLines={1}>
                {evaluation.score}/10 · {relativeTime(evaluation.createdAt)}
              </Text>
            </View>
            <Text style={[styles.recentScore, { color: tint }]}>{evaluation.score}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.chevron} />
          </View>
        </Card>
      )}
    </Pressable>
  );
}

function IconCircle({ children }: { children: ReactNode }) {
  return <View style={styles.iconCircle}>{children}</View>;
}

function CrownIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path
        d="M3.2 18.4h17.6v2.2H3.2zM4.4 17.6l2.4-8.6 3.2 4.6L12 5l2 8.6 3.2-4.6 2.4 8.6z"
        fill={color}
      />
    </Svg>
  );
}

function DocStarIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessible={false}>
      <Path
        d="M7 3.6h7.4L19.2 8.6V19.6A1.6 1.6 0 0 1 17.6 21.2H7A1.6 1.6 0 0 1 5.4 19.6V5.2A1.6 1.6 0 0 1 7 3.6z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path d="M14.2 3.6V8.4h5" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
      <Path
        d="M12 11.1l.85 2.15h2.25l-1.82 1.32.7 2.15L12 15.4l-1.98 1.32.7-2.15-1.82-1.32h2.25z"
        fill={color}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16,
  },
  headerRow: {
    minHeight: 44,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  upgradeChip: {
    minHeight: 34,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.primaryTint,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  upgradeChipLabel: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  heroRow: {
    position: 'relative',
    overflow: 'visible',
  },
  heroCopy: {
    zIndex: 1,
  },
  heroArt: {
    position: 'absolute',
    right: -12,
    top: -14,
    zIndex: 0,
  },
  heroSkeleton: {
    gap: 10,
    paddingTop: 4,
  },
  greetingSkeleton: {
    width: '72%',
  },
  headlineSkeleton: {
    width: '92%',
  },
  headlineSkeletonShort: {
    width: '58%',
  },
  hi: {
    fontFamily: fonts.serifBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.3,
    color: colors.primary,
    marginBottom: 6,
  },
  tagline: {
    fontFamily: fonts.serifRegular,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  accentRule: {
    marginTop: 10,
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  progressCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xxl,
    borderCurve: 'continuous',
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  progressCopy: {
    flex: 1,
    minWidth: 0,
  },
  progressTitle: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.white,
    opacity: 0.88,
  },
  progressCount: {
    marginTop: 4,
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.white,
  },
  progressSub: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.white,
    opacity: 0.8,
  },
  progressTrack: {
    marginTop: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.whiteAlpha25,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  progressDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: colors.whiteAlpha25,
  },
  progressLink: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
    paddingHorizontal: 4,
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  rowSubtitle: {
    ...type.bodySmall,
    marginTop: 2,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    marginRight: -6,
  },
  viewAllLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.accent,
  },
  recentSection: {
    gap: 12,
  },
  skeletonStack: {
    gap: 12,
  },
  recentList: {
    gap: 12,
  },
  tipPress: {
    marginTop: 0,
  },
  rowPressed: {
    opacity: 0.85,
  },
  recentMeta: {
    ...type.caption,
    marginTop: 4,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  recentScore: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    fontVariant: ['tabular-nums'],
  },
});
