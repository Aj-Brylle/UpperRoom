import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, borders } from '../theme';
import QuantityStepper from './QuantityStepper';

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onPressItem,
}) {
  if (!item) return null;

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onPressItem && onPressItem(item)}
        style={styles.imageContainer}
        accessibilityRole="button"
        accessibilityLabel={`View ${item.name}`}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </Pressable>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => onPressItem && onPressItem(item)}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
          </Pressable>
          <Text style={styles.itemTotal}>${itemTotal}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaLabel}>SIZE: {item.size}</Text>
          </View>

          {item.color && (
            <View style={styles.colorRow}>
              <View
                style={[
                  styles.colorDot,
                  {
                    backgroundColor: item.color.hex,
                    borderColor: item.color.border || colors.borderHairline,
                  },
                ]}
              />
              <Text style={styles.metaLabel}>{item.color.name}</Text>
            </View>
          )}

          <Text style={styles.unitPrice}>${item.price} each</Text>
        </View>

        <View style={styles.actionsRow}>
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
          />

          <Pressable
            onPress={() => onRemove(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.name} from bag`}
            style={({ hovered }) => [
              styles.removeButton,
              hovered && styles.removeButtonHovered,
            ]}
          >
            {({ hovered }) => (
              <Text
                style={[
                  styles.removeText,
                  hovered && styles.removeTextHovered,
                ]}
              >
                REMOVE
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    backgroundColor: colors.brandWhite,
  },
  imageContainer: {
    width: 90,
    height: 115,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    borderRadius: borders.radiusSharp,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceSubtle,
  },
  content: {
    flex: 1,
    marginLeft: spacing.lg,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.base,
    fontWeight: '600',
    color: colors.black,
    letterSpacing: typography.letterSpacing.normal,
    maxWidth: 240,
  },
  itemTotal: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.base,
    fontWeight: '600',
    color: colors.black,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: spacing.xs,
  },
  metaBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
  },
  metaLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  unitPrice: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  removeButtonHovered: {
    opacity: 0.7,
  },
  removeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  removeTextHovered: {
    color: colors.black,
  },
});

export default CartItem;
