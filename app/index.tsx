import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SplashDecor } from '@/components/decor/SplashDecor';
import { VMark } from '@/components/VMark';
import { DEMO_ALWAYS_SHOW_ONBOARDING, DEMO_FORCE_FIRST_RUN } from '@/config/demo';
import { getGoal } from '@/storage/goalStorage';
import { colors } from '@/theme/colors';
import { motion } from '@/theme/motion';
import { fonts } from '@/theme/typography';

const MIN_SPLASH_MS = 900;
const ENTRANCE_MS = motion.base;
const FADE_OUT_MS = motion.base;

const BAR_WIDTH = 140;
const BAR_HEIGHT = 4;

// Splash — navy field, U + plane, Plan. Apply. Achieve., then fades to Get Started or Home.
export default function SplashScreen() {
  const navigation = useNavigation();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const screenOpacity = useRef(new Animated.Value(1)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(-BAR_WIDTH)).current;

  useEffect(() => {
    let cancelled = false;

    const nativeDriver = process.env.EXPO_OS !== 'web';

    Animated.parallel([
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: ENTRANCE_MS,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(progress, {
        toValue: 0,
        duration: MIN_SPLASH_MS,
        useNativeDriver: nativeDriver,
      }),
    ]).start();

    let splashTimer: ReturnType<typeof setTimeout> | null = null;
    const minimumWait = new Promise<void>((resolve) => {
      splashTimer = setTimeout(resolve, MIN_SPLASH_MS);
    });
    const isSplashRoute = (route: string) => route === '/' || route === '/index';

    Promise.all([minimumWait, getGoal()])
      .then(async ([, savedGoal]) => {
        if (cancelled) return;
        if (!isSplashRoute(pathnameRef.current)) return;

        if (DEMO_FORCE_FIRST_RUN) {
          const { resetDemoSession } = await import('@/demo/resetDemoSession');
          await resetDemoSession();
        }
        if (cancelled || !isSplashRoute(pathnameRef.current)) return;

        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: FADE_OUT_MS,
          useNativeDriver: nativeDriver,
        }).start(() => {
          if (cancelled) return;
          if (!isSplashRoute(pathnameRef.current)) return;
          if (!DEMO_FORCE_FIRST_RUN && !DEMO_ALWAYS_SHOW_ONBOARDING && savedGoal) {
            navigation.reset({
              index: 0,
              routes: [{ name: '(tabs)', params: { screen: 'home' } }],
            } as never);
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'onboarding' }],
            } as never);
          }
        });
      })
      .catch(() => {
        if (cancelled || !isSplashRoute(pathnameRef.current)) return;
        navigation.reset({
          index: 0,
          routes: [{ name: 'onboarding' }],
        } as never);
      });

    return () => {
      cancelled = true;
      if (splashTimer) clearTimeout(splashTimer);
    };
  }, [brandOpacity, navigation, progress, screenOpacity]);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <SplashDecor width={width} height={height} />

      <Animated.View
        style={[
          styles.brand,
          {
            opacity: brandOpacity,
            paddingTop: insets.top + Math.max(height * 0.22, 96),
          },
        ]}
      >
        <VMark size={104} tone="onDark" />
        <Text style={styles.wordmark} maxFontSizeMultiplier={1.2}>
          UniPilot
        </Text>
        <Text style={styles.tagline} maxFontSizeMultiplier={1.2}>
          Plan. Apply. Achieve.
        </Text>
      </Animated.View>

      <View style={[styles.track, { bottom: insets.bottom + 48 }]}>
        <Animated.View style={[styles.fill, { transform: [{ translateX: progress }] }]}>
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.fill}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  brand: {
    alignItems: 'center',
    paddingHorizontal: 28,
    zIndex: 2,
  },
  wordmark: {
    marginTop: 14,
    color: colors.white,
    fontFamily: fonts.serifBold,
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0.2,
  },
  tagline: {
    marginTop: 12,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    textAlign: 'center',
    opacity: 0.88,
  },
  track: {
    position: 'absolute',
    alignSelf: 'center',
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: colors.splashProgressTrack,
    overflow: 'hidden',
    zIndex: 2,
  },
  fill: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
  },
});
