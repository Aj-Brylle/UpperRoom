import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, typography, borders } from '../theme';

export function QuantityStepper({
  quantity = 1,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  disabled = false,
  style,
}) {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={isMin || disabled ? null : onDecrement}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: isMin || disabled }}
        style={({ hovered, pressed }) => [
          styles.button,
          (hovered || pressed) && !isMin && !disabled && styles.buttonHover,
          isMin && styles.buttonDisabled,
        ]}
      >
        {({ hovered, pressed }) => {
          const isHover = (hovered || pressed) && !isMin && !disabled;
          return (
            <Text
              style={[
                styles.buttonText,
                isHover && styles.buttonTextHover,
                isMin && styles.buttonTextDisabled,
              ]}
            >
              −
            </Text>
          );
        }}
      </Pressable>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{quantity}</Text>
      </View>

      <Pressable
        onPress={isMax || disabled ? null : onIncrement}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: isMax || disabled }}
        style={({ hovered, pressed }) => [
          styles.button,
          (hovered || pressed) && !isMax && !disabled && styles.buttonHover,
          isMax && styles.buttonDisabled,
        ]}
      >
        {({ hovered, pressed }) => {
          const isHover = (hovered || pressed) && !isMax && !disabled;
          return (
            <Text
              style={[
                styles.buttonText,
                isHover && styles.buttonTextHover,
                isMax && styles.buttonTextDisabled,
              ]}
            >
              +
            </Text>
          );
        }}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.brandWhite,
    borderRadius: borders.radiusSharp,
    height: 44,
    alignSelf: 'flex-start',
  },
  button: {
    width: 42,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandWhite,
  },
  buttonHover: {
    backgroundColor: colors.black,
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceSubtle,
  },
  buttonText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 18,
    color: colors.black,
    lineHeight: 20,
    fontWeight: '400',
  },
  buttonTextHover: {
    color: colors.brandWhite,
  },
  buttonTextDisabled: {
    color: colors.neutralDisabledText,
  },
  valueContainer: {
    minWidth: 46,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderHairline,
    paddingHorizontal: 8,
  },
  valueText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.black,
    letterSpacing: typography.letterSpacing.normal,
  },
});

export default QuantityStepper;
