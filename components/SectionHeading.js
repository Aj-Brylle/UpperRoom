import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../theme';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverted = false,
  style,
  titleSize = '2xl',
}) {
  const isLeft = align === 'left';
  const isRight = align === 'right';

  const textColor = inverted ? colors.brandWhite : colors.black;
  const secondaryColor = inverted ? 'rgba(255, 255, 255, 0.7)' : colors.textSecondary;

  return (
    <View
      style={[
        styles.container,
        isLeft && styles.alignLeft,
        isRight && styles.alignRight,
        style,
      ]}
    >
      {eyebrow && (
        <Text
          style={[
            styles.eyebrow,
            { color: secondaryColor },
            isLeft && styles.textLeft,
            isRight && styles.textRight,
          ]}
        >
          {eyebrow}
        </Text>
      )}

      <Text
        accessibilityRole="header"
        style={[
          styles.title,
          styles[`title_${titleSize}`],
          { color: textColor },
          isLeft && styles.textLeft,
          isRight && styles.textRight,
        ]}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            { color: secondaryColor },
            isLeft && styles.textLeft,
            isRight && styles.textRight,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  eyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  title: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serif,
    }),
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.sizes['3xl'] * 1.15,
    textAlign: 'center',
  },
  title_xl: {
    fontSize: typography.sizes.xl,
    lineHeight: typography.sizes.xl * 1.2,
  },
  title_2xl: {
    fontSize: typography.sizes['2xl'],
    lineHeight: typography.sizes['2xl'] * 1.18,
  },
  title_3xl: {
    fontSize: typography.sizes['3xl'],
    lineHeight: typography.sizes['3xl'] * 1.15,
  },
  title_4xl: {
    fontSize: typography.sizes['4xl'],
    lineHeight: typography.sizes['4xl'] * 1.12,
  },
  subtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.wide,
    marginTop: spacing.xs,
    maxWidth: 580,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default SectionHeading;
