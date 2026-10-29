import React, { useState } from 'react';
import { View, Text, Modal, TextInput, ScrollView, StyleSheet, Platform, Pressable } from 'react-native';
import { colors, typography, spacing, borders } from '../theme';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export function CheckoutModal({ visible, onClose, onOrderPlaced }) {
  const { items, subtotal, clearBag } = useCart();
  const { addOrder } = useStore();
  const [step, setStep] = useState('shipping');
  const [fullName, setFullName] = useState('Christian Sterling');
  const [email, setEmail] = useState('sanctuary@upperroomapparel.com');
  const [address, setAddress] = useState('777 Olive Way, Suite 12');
  const [city, setCity] = useState('Dallas');
  const [zipCode, setZipCode] = useState('75201');
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = 0;
  const estimatedTax = (subtotal * 0.0825).toFixed(2);
  const orderTotal = (subtotal + Number(estimatedTax)).toFixed(2);

  const handlePlaceOrder = () => {
    const generatedOrderId = `UR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderId);

    addOrder({
      id: generatedOrderId,
      customerName: fullName.trim() || 'Christian Sterling',
      customerEmail: email.trim() || 'sanctuary@upperroomapparel.com',
      shippingAddress: `${address.trim()}, ${city.trim()} ${zipCode.trim()}`,
      items: items.map((it) => ({
        id: it.id,
        productId: it.productId,
        name: it.name,
        price: it.price,
        size: it.size,
        color: it.color,
        quantity: it.quantity,
        image: it.image,
      })),
      subtotal,
      tax: Number(estimatedTax),
      total: Number(orderTotal),
    });

    setStep('confirmation');
    clearBag();
    if (onOrderPlaced) onOrderPlaced(generatedOrderId);
  };

  const handleResetAndClose = () => {
    setStep('shipping');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleResetAndClose}
    >
      <View style={styles.modalScrim}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>
                {step === 'shipping' ? 'CONCIERGE CHECKOUT' : 'ORDER CONFIRMED'}
              </Text>
              <Text style={styles.modalSub}>
                {step === 'shipping'
                  ? 'COMPLIMENTARY WHITE-GLOVE DELIVERY'
                  : 'WALK IN PEACE AND HOLY STRENGTH'}
              </Text>
            </View>
            <Pressable
              onPress={handleResetAndClose}
              accessibilityRole="button"
              accessibilityLabel="Close checkout modal"
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {step === 'shipping' ? (
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.summaryStrip}>
                <Text style={styles.stripLabel}>TOTAL ({items.length} PIECES)</Text>
                <Text style={styles.stripValue}>${orderTotal}</Text>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionHeader}>1. CLIENT CREDENTIALS</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>FULL NAME</Text>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    placeholder="Enter full name"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>EMAIL FOR DISPATCH</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionHeader}>2. SANCTUARY DESTINATION</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>STREET ADDRESS</Text>
                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                  />
                </View>
                <View style={styles.rowInputs}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                    <Text style={styles.inputLabel}>CITY</Text>
                    <TextInput
                      value={city}
                      onChangeText={setCity}
                      style={styles.input}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 0.8 }]}>
                    <Text style={styles.inputLabel}>ZIP / POSTAL</Text>
                    <TextInput
                      value={zipCode}
                      onChangeText={setZipCode}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionHeader}>3. METHOD OF SETTLEMENT</Text>
                <View style={styles.paymentBox}>
                  <View style={styles.paymentRadioActive} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.paymentTitle}>MOCK LUXURY CARD / CONCIERGE</Text>
                    <Text style={styles.paymentSub}>Ending in •••• 7777 (Test Mode)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.feeBreakdown}>
                <View style={styles.feeRow}>
                  <Text style={styles.feeLabel}>Subtotal</Text>
                  <Text style={styles.feeValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.feeRow}>
                  <Text style={styles.feeLabel}>White-Glove Shipping</Text>
                  <Text style={styles.feeValue}>COMPLIMENTARY</Text>
                </View>
                <View style={styles.feeRow}>
                  <Text style={styles.feeLabel}>Estimated Tax</Text>
                  <Text style={styles.feeValue}>${estimatedTax}</Text>
                </View>
                <View style={[styles.feeRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>ORDER TOTAL</Text>
                  <Text style={styles.totalValue}>${orderTotal}</Text>
                </View>
              </View>

              <Button
                title="CONFIRM AND PLACE ORDER"
                variant="primary"
                size="lg"
                fullWidth
                onPress={handlePlaceOrder}
                style={{ marginTop: spacing.md, marginBottom: spacing.xl }}
              />
            </ScrollView>
          ) : (
            <View style={styles.confirmationContent}>
              <View style={styles.confirmationIconBox}>
                <Text style={styles.confirmationCheck}>✓</Text>
              </View>

              <Text style={styles.orderNumberLabel}>ORDER SPECIFICATION</Text>
              <Text style={styles.orderNumberValue}>{orderNumber}</Text>

              <Text style={styles.confirmationMessage}>
                Your order has been received into the UpperRoom archive.
                Each piece is packaged in custom white unbleached tissue and sealed with our blind debossed monogram.
              </Text>

              <View style={styles.scriptureBlessing}>
                <Text style={styles.blessingVerse}>“The Lord bless you and keep you; the Lord make his face shine upon you and be gracious to you.”</Text>
                <Text style={styles.blessingRef}>Numbers 6:24-25</Text>
              </View>

              <Button
                title="RETURN TO STORE"
                variant="primary"
                size="md"
                fullWidth
                onPress={handleResetAndClose}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalScrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.brandWhite,
    width: '100%',
    maxWidth: 580,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: borders.radiusSharp,
    overflow: 'hidden',
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.lg,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
  },
  modalSub: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.micro,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    color: colors.black,
  },
  modalBody: {
    flex: 1,
  },
  summaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    marginBottom: spacing.lg,
  },
  stripLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  stripValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    fontWeight: '700',
    color: colors.black,
  },
  formSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: spacing.sm,
  },
  inputLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    paddingVertical: 6,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    color: colors.black,
    outlineStyle: 'none',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.brandWhite,
  },
  paymentRadioActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.black,
  },
  paymentTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.black,
    fontWeight: '600',
  },
  paymentSub: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.micro,
    color: colors.textSecondary,
  },
  feeBreakdown: {
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    paddingTop: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  feeLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  feeValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    color: colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.black,
    paddingTop: 10,
    marginTop: 6,
  },
  totalLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
  },
  totalValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.black,
  },
  confirmationContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  confirmationIconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  confirmationCheck: {
    fontSize: 24,
    color: colors.black,
  },
  orderNumberLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.micro,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  orderNumberValue: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xl,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  confirmationMessage: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
    marginBottom: spacing.lg,
  },
  scriptureBlessing: {
    padding: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.borderHairline,
    marginBottom: spacing['2xl'],
    width: '100%',
  },
  blessingVerse: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifRegular,
    }),
    fontSize: typography.sizes.sm,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.black,
    lineHeight: 20,
    marginBottom: 6,
  },
  blessingRef: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

export default CheckoutModal;
