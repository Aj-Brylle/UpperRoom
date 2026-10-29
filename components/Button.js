import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Platform, View } from 'react-native';
import { colors, typography, borders } from '../theme';

export function Button({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  icon,
  iconPosition = 'left',
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || (typeof title === 'string' ? title : undefined)}
      accessibilityState={{ disabled }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={({ hovered, pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        (hovered || pressed) && !disabled && styles[`variant_${variant}_hover`],
        disabled && styles.disabled,
        isFocused && styles.focused,
        Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          },
        }),
        style,
      ]}
    >
      {({ hovered, pressed }) => {
        const isHoveredOrPressed = (hovered || pressed) && !disabled;
        
        let textColor = colors.black;
        if (variant === 'primary') {
          textColor = isHoveredOrPressed ? colors.brandWhite : colors.black;
        } else if (variant === 'secondary' || variant === 'dark') {
          textColor = isHoveredOrPressed ? colors.black : colors.brandWhite;
        } else if (variant === 'outline') {
          textColor = isHoveredOrPressed ? colors.brandWhite : colors.black;
        } else if (variant === 'ghost') {
          textColor = colors.black;
        }

        if (disabled) {
          textColor = colors.neutralDisabledText;
        }

        const labelContent = title || children;

        return (
          <View style={styles.contentRow}>
            {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
            <Text
              style={[
                styles.textBase,
                styles[`textSize_${size}`],
                { color: textColor },
                textStyle,
              ]}
            >
              {labelContent}
            </Text>
            {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borders.radiusSharp,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  size_sm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 38,
  },
  size_md: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  textSize_sm: {
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
  },
  textSize_md: {
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.wider,
  },
  textSize_lg: {
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.widest,
  },
  textBase: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  variant_primary: {
    backgroundColor: colors.brandWhite,
    borderWidth: 1,
    borderColor: colors.black,
  },
  variant_primary_hover: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  variant_secondary: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.black,
  },
  variant_secondary_hover: {
    backgroundColor: colors.brandWhite,
    borderColor: colors.black,
  },
  variant_dark: {
    backgroundColor: colors.darkSection,
    borderWidth: 1,
    borderColor: colors.darkSection,
  },
  variant_dark_hover: {
    backgroundColor: colors.brandWhite,
    borderColor: colors.brandWhite,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.black,
  },
  variant_outline_hover: {
    backgroundColor: colors.black,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  variant_ghost_hover: {
    opacity: 0.65,
  },
  disabled: {
    borderColor: colors.neutralDisabled,
    backgroundColor: colors.surfaceSubtle,
    opacity: 0.7,
  },
  focused: {
    outlineWidth: 1,
    outlineColor: colors.black,
    outlineStyle: 'solid',
  },
});

export default Button;
