import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export function ContactScreen({ navigation }) {
  const { isMobile, horizontalPadding } = useBreakpoint();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Concierge');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Client Concierge & Inquiries | UpperRoom Apparel';
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required for client records.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required for dispatch.';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters for your inquiry.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <View style={styles.screen}>
      <Header activeRoute="Contact" navigation={navigation} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.pageHeader, { paddingHorizontal: horizontalPadding }]}>
            <View style={styles.headerContainer}>
              <Text style={styles.pageEyebrow}>PERSONAL CONCIERGE</Text>
              <Text style={styles.pageTitle}>CLIENT RELATIONS</Text>
              <Text style={styles.pageSubtitle}>
                Whether you seek sizing counsel, bespoke ministry orders, or private showroom appointments, our concierge is at your service.
              </Text>
            </View>
          </View>

          <View style={[styles.mainLayout, { paddingHorizontal: horizontalPadding }]}>
            <View style={[styles.twoColGrid, isMobile && styles.twoColMobile]}>
              <View style={styles.formCol}>
                <Text style={styles.formHeading}>TRANSMIT AN INQUIRY</Text>

                {isSubmitted ? (
                  <View style={styles.successBox}>
                    <Text style={styles.successIcon}>✓</Text>
                    <Text style={styles.successTitle}>INQUIRY TRANSMITTED</Text>
                    <Text style={styles.successBody}>
                      Peace be with you. Your correspondence has been logged into our concierge queue. A dedicated advisor will respond within 24 business hours.
                    </Text>
                    <Button
                      title="SEND ANOTHER NOTE"
                      variant="primary"
                      size="md"
                      onPress={() => setIsSubmitted(false)}
                      style={{ marginTop: spacing.lg }}
                    />
                  </View>
                ) : (
                  <View style={styles.formFields}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>FULL NAME *</Text>
                      <TextInput
                        value={name}
                        onChangeText={(t) => {
                          setName(t);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                        }}
                        placeholder="e.g. Christian Sterling"
                        placeholderTextColor={colors.textSecondary}
                        style={[
                          styles.underlinedInput,
                          errors.name && styles.inputErrorBorder,
                        ]}
                      />
                      {errors.name && (
                        <View style={styles.errorNotice}>
                          <Text style={styles.errorIcon}>✕</Text>
                          <Text style={styles.errorNoticeText}>{errors.name}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>EMAIL ADDRESS *</Text>
                      <TextInput
                        value={email}
                        onChangeText={(t) => {
                          setEmail(t);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                        }}
                        placeholder="e.g. client@sanctuary.com"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={[
                          styles.underlinedInput,
                          errors.email && styles.inputErrorBorder,
                        ]}
                      />
                      {errors.email && (
                        <View style={styles.errorNotice}>
                          <Text style={styles.errorIcon}>✕</Text>
                          <Text style={styles.errorNoticeText}>{errors.email}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>NATURE OF INQUIRY</Text>
                      <View style={styles.categoryChipsRow}>
                        {[
                          'Concierge',
                          'Sizing & Styling',
                          'Private Ministry',
                          'Press & Archive',
                        ].map((cat) => {
                          const isSelected = inquiryType === cat;
                          return (
                            <Button
                              key={cat}
                              title={cat}
                              variant={isSelected ? 'secondary' : 'outline'}
                              size="sm"
                              onPress={() => setInquiryType(cat)}
                              style={styles.chipButton}
                            />
                          );
                        })}
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>MESSAGE *</Text>
                      <TextInput
                        value={message}
                        onChangeText={(t) => {
                          setMessage(t);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: null }));
                        }}
                        placeholder="Detail your request or specific garment inquiries..."
                        placeholderTextColor={colors.textSecondary}
                        multiline
                        numberOfLines={4}
                        style={[
                          styles.underlinedInput,
                          styles.textAreaInput,
                          errors.message && styles.inputErrorBorder,
                        ]}
                      />
                      {errors.message && (
                        <View style={styles.errorNotice}>
                          <Text style={styles.errorIcon}>✕</Text>
                          <Text style={styles.errorNoticeText}>{errors.message}</Text>
                        </View>
                      )}
                    </View>

                    <Button
                      title="SUBMIT INQUIRY"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onPress={handleSubmit}
                      style={styles.submitBtn}
                    />
                  </View>
                )}
              </View>

              <View style={styles.infoCol}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoEyebrow}>HEADQUARTERS</Text>
                  <Text style={styles.infoTitle}>UPPERROOM APPAREL ATELIER</Text>
                  <Text style={styles.infoAddress}>
                    404 Olive Street, Floor 7{'\n'}
                    Dallas, Texas 75201{'\n'}
                    United States
                  </Text>

                  <View style={styles.infoDivider} />

                  <Text style={styles.infoEyebrow}>DIRECT CORRESPONDENCE</Text>
                  <Text style={styles.infoLink}>concierge@upperroomapparel.com</Text>
                  <Text style={styles.infoLink}>press@upperroomapparel.com</Text>

                  <View style={styles.infoDivider} />

                  <Text style={styles.infoEyebrow}>CONCIERGE HOURS</Text>
                  <Text style={styles.infoHours}>
                    Monday – Friday: 09:00 – 18:00 CST{'\n'}
                    Sabbath / Sunday: Closed for Worship & Rest
                  </Text>

                  <View style={styles.verseNote}>
                    <Text style={styles.verseNoteText}>
                      “Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person.”
                    </Text>
                    <Text style={styles.verseNoteRef}>COLOSSIANS 4:6</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Footer navigation={navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brandWhite,
  },
  keyboardContainer: {
    flex: 1,
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
    maxWidth: 620,
  },
  mainLayout: {
    paddingVertical: spacing['5xl'],
    backgroundColor: colors.brandWhite,
  },
  twoColGrid: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    flexDirection: 'row',
    gap: 64,
  },
  twoColMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  formCol: {
    flex: 1.4,
  },
  formHeading: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.xl,
    color: colors.black,
    fontWeight: '700',
    letterSpacing: typography.letterSpacing.wide,
    marginBottom: spacing.xl,
  },
  formFields: {
    gap: 24,
  },
  inputGroup: {
    width: '100%',
  },
  inputLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    marginBottom: 6,
    fontWeight: '700',
  },
  underlinedInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingVertical: 10,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    color: colors.black,
    outlineStyle: 'none',
  },
  inputErrorBorder: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  textAreaInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  categoryChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chipButton: {
    marginRight: 4,
    marginBottom: 4,
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  errorIcon: {
    fontSize: 11,
    color: colors.black,
    fontWeight: '700',
  },
  errorNoticeText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 11,
    color: colors.black,
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.normal,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  successBox: {
    padding: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: 32,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  successTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.xl,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  successBody: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 440,
  },
  infoCol: {
    flex: 1,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: colors.borderHairline,
    padding: spacing['2xl'],
    backgroundColor: colors.surfaceSubtle,
  },
  infoEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.md,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  infoAddress: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 20,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.borderHairline,
    marginVertical: spacing.lg,
  },
  infoLink: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wide,
    color: colors.black,
    marginBottom: 4,
  },
  infoHours: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 20,
    color: colors.textMuted,
  },
  verseNote: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
  },
  verseNoteText: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifRegular,
    }),
    fontSize: typography.sizes.xs,
    fontStyle: 'italic',
    lineHeight: 18,
    color: colors.textMuted,
    marginBottom: 4,
  },
  verseNoteRef: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 9,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
  },
});

export default ContactScreen;
