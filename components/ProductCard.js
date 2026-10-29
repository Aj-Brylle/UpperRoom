import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, borders } from '../theme';

export function ProductCard({
  product,
  onPress,
  aspectRatio = 4 / 5,
  style,
  showCategory = true,
}) {
  const [isFocused, setIsFocused] = useState(false);

  if (!product) return null;

  const imageUri = product.images && product.images[0];
  const formattedPrice = `$${product.price}`;

  return (
    <Pressable
      onPress={() => onPress && onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.name}, price ${formattedPrice}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={({ hovered }) => [
        styles.container,
        hovered && styles.containerHovered,
        isFocused && styles.containerFocused,
        style,
      ]}
    >
      {({ hovered }) => (
        <View style={styles.innerWrapper}>
          <View style={[styles.imageWrapper, { aspectRatio }]}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={[
                  styles.image,
                  hovered && styles.imageHovered,
                ]}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>UPPERROOM</Text>
              </View>
            )}

            {product.scripture && (
              <View style={styles.verseBadge}>
                <Text style={styles.verseBadgeText}>
                  {product.scripture.verse}
                </Text>
              </View>
            )}

            {hovered && Platform.OS === 'web' && (
              <View style={styles.hoverScrim}>
                <Text style={styles.hoverScrimText}>DISCOVER PIECE</Text>
              </View>
            )}
          </View>

          <View style={styles.details}>
            {showCategory && (
              <Text style={styles.category}>{product.category}</Text>
            )}

            <Text numberOfLines={1} style={styles.title}>
              {product.name}
            </Text>

            <View style={styles.footerRow}>
              <Text style={styles.price}>{formattedPrice}</Text>

              {product.colors && product.colors.length > 0 && (
                <View style={styles.swatchRow}>
                  {product.colors.map((c, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.swatchDot,
                        {
                          backgroundColor: c.hex,
                          borderColor: c.border || colors.borderHairline,
                        },
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brandWhite,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    borderRadius: borders.radiusSharp,
    overflow: 'hidden',
    position: 'relative',
  },
  containerHovered: {
    borderColor: colors.black,
  },
  containerFocused: {
    outlineWidth: 1,
    outlineColor: colors.black,
    outlineStyle: 'solid',
  },
  innerWrapper: {
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: colors.surfaceSubtle,
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageHovered: {
    transform: [{ scale: 1.03 }],
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
  },
  verseBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.borderHairline,
  },
  verseBadgeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.black,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  hoverScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoverScrimText: {
    color: colors.brandWhite,
    fontSize: typography.sizes.micro,
    letterSpacing: typography.letterSpacing.widest,
    fontWeight: '700',
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    textTransform: 'uppercase',
  },
  details: {
    padding: spacing.md,
    backgroundColor: colors.brandWhite,
  },
  category: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.sm,
    color: colors.black,
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.normal,
    marginBottom: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  price: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.sm,
    color: colors.black,
    fontWeight: '500',
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swatchDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 4,
  },
});

export default ProductCard;
