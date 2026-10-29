import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import QuantityStepper from '../components/QuantityStepper';
import ProductCard from '../components/ProductCard';

export function ProductDetailScreen({ route, navigation }) {
  const { id } = route.params || {};
  const { products } = useStore();
  const product = products.find((p) => p.id === id) || products[0];

  const { isMobile, horizontalPadding } = useBreakpoint();
  const { addToBag } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(
    product && product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [scriptureExpanded, setScriptureExpanded] = useState(true);
  const [careExpanded, setCareExpanded] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        document.title = `${product.name} | UpperRoom Apparel`;
      }
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [product?.id]);

  const handleAddToBag = () => {
    addToBag(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product?.id && p.category === product?.category)
    .slice(0, 3);

  if (!product) return null;

  return (
    <View style={styles.screen}>
      <Header activeRoute="Shop" navigation={navigation} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.breadcrumbRow, { paddingHorizontal: horizontalPadding }]}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.breadcrumbLink}>HOME</Text>
          </Pressable>
          <Text style={styles.breadcrumbDivider}>/</Text>
          <Pressable onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.breadcrumbLink}>COLLECTION</Text>
          </Pressable>
          <Text style={styles.breadcrumbDivider}>/</Text>
          <Text style={styles.breadcrumbCurrent}>{product.name.toUpperCase()}</Text>
        </View>

        <View style={[styles.mainLayout, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.twoColumnGrid, isMobile && styles.twoColumnMobile]}>
            <View style={styles.galleryColumn}>
              {!isMobile && product.images && product.images.length > 1 && (
                <View style={styles.thumbnailList}>
                  {product.images.map((imgUri, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => setSelectedImageIndex(idx)}
                      style={[
                        styles.thumbnailWrapper,
                        selectedImageIndex === idx && styles.thumbnailActive,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`View angle ${idx + 1}`}
                    >
                      <Image
                        source={{ uri: imgUri }}
                        style={styles.thumbnailImage}
                        resizeMode="cover"
                      />
                    </Pressable>
                  ))}
                </View>
              )}

              <View style={styles.mainImageWrapper}>
                <Image
                  source={{
                    uri:
                      product.images && product.images[selectedImageIndex]
                        ? product.images[selectedImageIndex]
                        : product.images[0],
                  }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />

                {isMobile && product.images && product.images.length > 1 && (
                  <View style={styles.mobileThumbnailsRow}>
                    {product.images.map((_, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => setSelectedImageIndex(idx)}
                        style={[
                          styles.mobileIndicatorDot,
                          selectedImageIndex === idx && styles.mobileIndicatorDotActive,
                        ]}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.detailsColumn}>
              <Text style={styles.categoryBadge}>{product.category}</Text>
              <Text style={styles.productTitle}>{product.name}</Text>
              <Text style={styles.priceTag}>${product.price}.00</Text>

              <Text style={styles.descriptionText}>{product.description}</Text>

              <View style={styles.hairlineDivider} />

              <View style={styles.optionSection}>
                <View style={styles.optionHeaderRow}>
                  <Text style={styles.optionLabel}>COLORWAY:</Text>
                  <Text style={styles.optionValue}>
                    {selectedColor?.name.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.swatchSelectorRow}>
                  {product.colors && product.colors.map((c, idx) => {
                    const isSelected = selectedColor?.name === c.name;
                    return (
                      <Pressable
                        key={idx}
                        onPress={() => setSelectedColor(c)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        accessibilityLabel={`Select color ${c.name}`}
                        style={[
                          styles.colorSwatchButton,
                          isSelected && styles.colorSwatchButtonActive,
                        ]}
                      >
                        <View
                          style={[
                            styles.colorSwatchInner,
                            { backgroundColor: c.hex, borderColor: c.border || colors.borderHairline },
                          ]}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.optionSection}>
                <View style={styles.optionHeaderRow}>
                  <Text style={styles.optionLabel}>SIZE:</Text>
                  <Text style={styles.sizeGuideLink}>COMPLIMENTARY RESIZING</Text>
                </View>

                <View style={styles.sizeGrid}>
                  {product.sizes && product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <Pressable
                        key={s}
                        onPress={() => setSelectedSize(s)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        accessibilityLabel={`Select size ${s}`}
                        style={[
                          styles.sizeSquare,
                          isSelected && styles.sizeSquareActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.sizeText,
                            isSelected && styles.sizeTextActive,
                          ]}
                        >
                          {s}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.actionRow}>
                <QuantityStepper
                  quantity={quantity}
                  onIncrement={() => setQuantity((q) => q + 1)}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={styles.detailStepper}
                />

                <Button
                  title={addedNotice ? "✓ ADDED TO BAG" : "ADD TO BAG"}
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={handleAddToBag}
                  style={styles.addToBagBtn}
                />
              </View>

              <View style={styles.perkNote}>
                <Text style={styles.perkIcon}>✦</Text>
                <Text style={styles.perkText}>
                  Complimentary worldwide priority delivery & 30-day quiet returns.
                </Text>
              </View>

              <View style={styles.accordionBox}>
                <Pressable
                  onPress={() => setScriptureExpanded(!scriptureExpanded)}
                  style={styles.accordionHeader}
                >
                  <Text style={styles.accordionTitle}>
                    SCRIPTURE BEHIND THE DESIGN
                  </Text>
                  <Text style={styles.accordionPlus}>
                    {scriptureExpanded ? '−' : '+'}
                  </Text>
                </Pressable>

                {scriptureExpanded && product.scripture && (
                  <View style={styles.accordionBody}>
                    <Text style={styles.scriptureVerseRef}>
                      {product.scripture.verse}
                    </Text>
                    <Text style={styles.scripturePassage}>
                      “{product.scripture.passage}”
                    </Text>
                    <Text style={styles.scriptureReflection}>
                      {product.scripture.reflection}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.accordionBox}>
                <Pressable
                  onPress={() => setCareExpanded(!careExpanded)}
                  style={styles.accordionHeader}
                >
                  <Text style={styles.accordionTitle}>
                    GARMENT SPECIFICATIONS & CARE
                  </Text>
                  <Text style={styles.accordionPlus}>
                    {careExpanded ? '−' : '+'}
                  </Text>
                </Pressable>

                {careExpanded && (
                  <View style={styles.accordionBody}>
                    <Text style={styles.specItem}>
                      • FABRIC: {product.fabric}
                    </Text>
                    <Text style={styles.specItem}>
                      • ORIGIN: Milled and woven in small artisan facilities in Portugal.
                    </Text>
                    <Text style={styles.specItem}>
                      • CARE: Machine wash cold with like whites. Flat air dry recommended to maintain architectural structure.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {relatedProducts.length > 0 && (
          <View style={[styles.relatedSection, { paddingHorizontal: horizontalPadding }]}>
            <View style={styles.relatedContainer}>
              <Text style={styles.relatedEyebrow}>CURATED COMPANIONS</Text>
              <Text style={styles.relatedTitle}>COMPLETE THE SANCTUARY</Text>

              <View style={[styles.relatedGrid, { marginHorizontal: -spacing.xs }]}>
                {relatedProducts.map((p) => (
                  <View key={p.id} style={styles.relatedCol}>
                    <ProductCard
                      product={p}
                      onPress={() => navigation.navigate('ProductDetail', { id: p.id })}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        <Footer navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brandWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    maxWidth: 1400,
    width: '100%',
    marginHorizontal: 'auto',
  },
  breadcrumbLink: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  breadcrumbDivider: {
    marginHorizontal: 8,
    color: colors.borderHairline,
    fontSize: 11,
  },
  breadcrumbCurrent: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '600',
  },
  mainLayout: {
    paddingVertical: spacing['4xl'],
    backgroundColor: colors.brandWhite,
  },
  twoColumnGrid: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    flexDirection: 'row',
    gap: 48,
  },
  twoColumnMobile: {
    flexDirection: 'column',
    gap: 28,
  },
  galleryColumn: {
    flex: 1.2,
    flexDirection: 'row',
    gap: 16,
  },
  thumbnailList: {
    width: 80,
    gap: 12,
  },
  thumbnailWrapper: {
    width: 80,
    height: 100,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    overflow: 'hidden',
  },
  thumbnailActive: {
    borderColor: colors.black,
    borderWidth: 1.5,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  mainImageWrapper: {
    flex: 1,
    aspectRatio: 3 / 4,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    position: 'relative',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  mobileThumbnailsRow: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  mobileIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  mobileIndicatorDotActive: {
    backgroundColor: colors.black,
    width: 20,
  },
  detailsColumn: {
    flex: 1,
    paddingTop: 8,
  },
  categoryBadge: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  productTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['3xl'],
    lineHeight: typography.sizes['3xl'] * 1.15,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  priceTag: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.lg,
    color: colors.black,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: colors.borderHairline,
    marginBottom: spacing.lg,
  },
  optionSection: {
    marginBottom: spacing.xl,
  },
  optionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  optionLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 11,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
  },
  optionValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 11,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.textSecondary,
  },
  sizeGuideLink: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  swatchSelectorRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  colorSwatchButton: {
    padding: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  colorSwatchButtonActive: {
    borderColor: colors.black,
  },
  colorSwatchInner: {
    width: 24,
    height: 24,
    borderWidth: 1,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  sizeSquare: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.brandWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSquareActive: {
    backgroundColor: colors.black,
  },
  sizeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.normal,
  },
  sizeTextActive: {
    color: colors.brandWhite,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: spacing.lg,
  },
  detailStepper: {
    height: 48,
  },
  addToBagBtn: {
    flex: 1,
  },
  perkNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    marginBottom: spacing.xl,
  },
  perkIcon: {
    fontSize: 12,
    color: colors.black,
  },
  perkText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: typography.letterSpacing.wide,
  },
  accordionBox: {
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    paddingVertical: spacing.md,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
  },
  accordionPlus: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '300',
  },
  accordionBody: {
    paddingTop: spacing.md,
  },
  scriptureVerseRef: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    marginBottom: 4,
    fontWeight: '700',
  },
  scripturePassage: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifMedium,
    }),
    fontSize: typography.sizes.sm,
    fontStyle: 'italic',
    lineHeight: 22,
    color: colors.black,
    marginBottom: 8,
  },
  scriptureReflection: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  specItem: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: 4,
  },
  relatedSection: {
    paddingVertical: spacing['5xl'],
    backgroundColor: colors.surfaceSubtle,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
  },
  relatedContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  relatedEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  relatedTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.xl,
    color: colors.black,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: spacing.xl,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  relatedCol: {
    flex: 1,
    minWidth: 260,
    paddingHorizontal: spacing.xs,
  },
});

export default ProductDetailScreen;
