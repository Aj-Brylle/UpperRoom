import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export function NotFoundScreen({ navigation }) {
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = '404 - Archive Not Found | UpperRoom Apparel';
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Header activeRoute="" navigation={navigation} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.code}>001 // SANCTUARY ARCHIVE</Text>
          <Text style={styles.title}>PAGE NOT FOUND</Text>
          <Text style={styles.description}>
            The archive page or piece you are searching for is unavailable or has been relocated to the permanent collection.
          </Text>

          <View style={styles.actions}>
            <Button
              title="RETURN HOME"
              variant="primary"
              size="md"
              onPress={() => navigation.navigate('Home')}
            />
            <Button
              title="EXPLORE THE COLLECTION"
              variant="outline"
              size="md"
              onPress={() => navigation.navigate('Shop')}
            />
          </View>
        </View>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brandWhite,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['7xl'],
    paddingHorizontal: 24,
  },
  card: {
    maxWidth: 500,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    padding: spacing['3xl'],
    backgroundColor: colors.brandWhite,
  },
  code: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['2xl'],
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default NotFoundScreen;
