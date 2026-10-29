import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import CheckoutModal from '../components/CheckoutModal';

export function BagScreen({ navigation }) {
  const { isMobile, horizontalPadding } = useBreakpoint();
  const { items, subtotal, totalCount, updateQuantity, removeFromBag } = useCart();
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = `Shopping Bag (${totalCount}) | UpperRoom Apparel`;
    }
  }, [totalCount]);

  const estimatedTax = (subtotal * 0.0825).toFixed(2);
  const total = (subtotal + Number(estimatedTax)).toFixed(2);

  return (
    <View style={styles.screen}>
      <Header activeRoute="Bag" navigation={navigation} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.pageHeader, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.headerContainer}>
            <Text style={styles.pageEyebrow}>YOUR SELECTION</Text>
            <Text style={styles.pageTitle}>SHOPPING BAG</Text>
            <Text style={styles.pageSubtitle}>
              {totalCount > 0
                ? `You have reserved ${totalCount} ${totalCount === 1 ? 'piece' : 'pieces'}. Each order is inspected by hand before dispatch.`
                : 'Your bag is empty.'}
            </Text>
          </View>
        </View>

        <View style={[styles.mainLayout, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.mainContainer}>
            {items.length > 0 ? (
              <View style={[styles.bagColumns, isMobile && styles.bagColumnsMobile]}>
                <View style={styles.itemsListCol}>
                  <View style={styles.listHeaderRow}>
                    <Text style={styles.listHeaderText}>PIECE DETAILS</Text>
                    <Text style={styles.listHeaderText}>TOTAL</Text>
                  </View>

                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromBag}
                      onPressItem={() =>
                        navigation.navigate('ProductDetail', { id: item.productId })
                      }
                    />
                  ))}

                  <View style={styles.sanctuaryAssurance}>
                    <Text style={styles.assuranceTitle}>THE UPPER ROOM PROMISE</Text>
                    <Text style={styles.assuranceText}>
                      We prioritize ethical European mills, certified ring-spun organic textiles, and quiet aesthetic longevity. If a garment fails to bring quiet reverence to your wardrobe, return it unworn within 30 days.
                    </Text>
                  </View>
                </View>

                <View style={styles.summaryCol}>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>White-Glove Shipping</Text>
                      <Text style={styles.summaryValue}>COMPLIMENTARY</Text>
                    </View>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Estimated State & Local Tax</Text>
                      <Text style={styles.summaryValue}>${estimatedTax}</Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
                      <Text style={styles.totalValue}>${total}</Text>
                    </View>

                    <Text style={styles.dutiesNote}>
                      Taxes calculated at settlement. Complimentary global tracking provided upon shipment.
                    </Text>

                    <Button
                      title="PROCEED TO CHECKOUT"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onPress={() => setCheckoutVisible(true)}
                      style={styles.checkoutButton}
                    />

                    <View style={styles.badgesRow}>
                      <Text style={styles.badgeText}>✦ 100% ORGANIC COTTON</Text>
                      <Text style={styles.badgeText}>✦ COMPLIMENTARY EXCHANGES</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyCode}>000 // EMPTY ARCHIVE</Text>
                <Text style={styles.emptyTitle}>YOUR BAG IS EMPTY</Text>
                <Text style={styles.emptyDescription}>
                  You have not added any pieces to your bag yet. Explore our canonical collection of quiet luxury heavyweight essentials.
                </Text>
                <Button
                  title="EXPLORE THE COLLECTION"
                  variant="primary"
                  size="lg"
                  onPress={() => navigation.navigate('Shop')}
                />
              </View>
            )}
          </View>
        </View>

        <CheckoutModal
          visible={checkoutVisible}
          onClose={() => setCheckoutVisible(false)}
          onOrderPlaced={() => {}}
        />

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
  pageHeader: {
    paddingVertical: spacing['4xl'],
    backgroundColor: colors.surfaceSubtle,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
  },
  headerContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  pageEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  pageTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['3xl'],
    color: colors.black,
    fontWeight: '700',
    letterSpacing: typography.letterSpacing.normal,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textMuted,
  },
  mainLayout: {
    paddingVertical: spacing['4xl'],
    backgroundColor: colors.brandWhite,
  },
  mainContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  bagColumns: {
    flexDirection: 'row',
    gap: 48,
    alignItems: 'flex-start',
  },
  bagColumnsMobile: {
    flexDirection: 'column',
    gap: 36,
  },
  itemsListCol: {
    flex: 1.5,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  listHeaderText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
  },
  sanctuaryAssurance: {
    marginTop: spacing['3xl'],
    padding: spacing.xl,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
  },
  assuranceTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 11,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  assuranceText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 22,
    color: colors.textMuted,
  },
  summaryCol: {
    flex: 1,
    minWidth: 320,
    position: 'sticky',
    top: 90,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: colors.black,
    padding: spacing.xl,
    backgroundColor: colors.brandWhite,
  },
  summaryTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.lg,
    color: colors.black,
    fontWeight: '700',
    letterSpacing: typography.letterSpacing.wide,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.normal,
  },
  summaryValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.borderHairline,
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
  },
  totalValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xl,
    color: colors.black,
    fontWeight: '700',
  },
  dutiesNote: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    lineHeight: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  checkoutButton: {
    marginBottom: spacing.lg,
  },
  badgesRow: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    paddingTop: spacing.md,
  },
  badgeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['7xl'],
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    backgroundColor: colors.surfaceSubtle,
  },
  emptyCode: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['2xl'],
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
});

export default BagScreen;
