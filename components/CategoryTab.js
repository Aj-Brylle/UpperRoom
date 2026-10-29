import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../theme';

export function CategoryTab({
  label,
  isActive = false,
  onPress,
  count,
  accessibilityLabel,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={accessibilityLabel || `${label} category`}
      style={styles.tab}
    >
      {({ hovered }) => {
        const isHovered = hovered && !isActive;
        return (
          <View style={styles.tabContent}>
            <View style={styles.labelRow}>
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                  isHovered && styles.tabTextHovered,
                ]}
              >
                {label}
              </Text>
              {typeof count === 'number' && (
                <Text
                  style={[
                    styles.countText,
                    isActive && styles.countTextActive,
                  ]}
                >
                  ({count})
                </Text>
              )}
            </View>

            <View
              style={[
                styles.underline,
                isActive && styles.underlineActive,
                isHovered && styles.underlineHovered,
              ]}
            />
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6,
  },
  tabText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.black,
    fontWeight: '700',
  },
  tabTextHovered: {
    color: colors.black,
  },
  countText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.micro,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  countTextActive: {
    color: colors.black,
    fontWeight: '600',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'transparent',
  },
  underlineActive: {
    backgroundColor: colors.black,
  },
  underlineHovered: {
    backgroundColor: colors.borderHairline,
  },
});

export default CategoryTab;
