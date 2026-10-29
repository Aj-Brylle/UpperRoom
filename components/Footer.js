import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function Footer({ navigation }) {
  const { isMobile } = useBreakpoint();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim().length > 3 && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const navigateTo = (routeName) => {
    if (navigation) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          <View style={[styles.col, styles.colBrand]}>
            <Text style={styles.brandTitle}>UPPERROOM</Text>
            <Text style={styles.tagline}>WEAR THE WORD. WALK IN THE SPIRIT.</Text>
            <Text style={styles.blurb}>
              Quiet luxury streetwear born from contemplative waiting and divine presence.
              Crafted in disciplined white and architectural monochrome silhouettes using heavyweight
              milled organic textiles.
            </Text>
            <View style={styles.scriptureNote}>
              <Text style={styles.scriptureNoteText}>
                “Tarried in Jerusalem until clothed with power from on high.” — Luke 24:49
              </Text>
            </View>
          </View>

          <View style={[styles.col, styles.colLinks]}>
            <Text style={styles.colHeader}>COLLECTION</Text>
            {[
              { label: 'ALL PIECES', route: 'Shop' },
              { label: 'OVERSIZED TEES', route: 'Shop' },
              { label: 'HEAVY FLEECE', route: 'Shop' },
              { label: 'HEADWEAR', route: 'Shop' },
              { label: 'ACCESSORIES', route: 'Shop' },
            ].map((link, idx) => (
              <Pressable
                key={idx}
                onPress={() => navigateTo(link.route)}
                accessibilityRole="link"
                accessibilityLabel={link.label}
                style={styles.linkItem}
              >
                {({ hovered }) => (
                  <Text
                    style={[
                      styles.linkText,
                      hovered && styles.linkTextHovered,
                    ]}
                  >
                    {link.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>

          <View style={[styles.col, styles.colLinks]}>
            <Text style={styles.colHeader}>SANCTUARY</Text>
            {[
              { label: 'OUR STORY & THE NAME', route: 'About' },
              { label: 'THE SYMBOLISM OF WHITE', route: 'About' },
              { label: 'CLIENT CONCIERGE', route: 'Contact' },
              { label: 'ATELIER ADMIN', route: 'Admin' },
              { label: 'COMPLIMENTARY SHIPPING', route: 'Bag' },
            ].map((link, idx) => (
              <Pressable
                key={idx}
                onPress={() => navigateTo(link.route)}
                accessibilityRole="link"
                accessibilityLabel={link.label}
                style={styles.linkItem}
              >
                {({ hovered }) => (
                  <Text
                    style={[
                      styles.linkText,
                      hovered && styles.linkTextHovered,
                    ]}
                  >
                    {link.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>

          <View style={[styles.col, styles.colNewsletter]}>
            <Text style={styles.colHeader}>THE DISPATCH</Text>
            <Text style={styles.newsletterText}>
              Receive silent notifications for private drops, contemplative essays, and limited archive reissues.
            </Text>

            {subscribed ? (
              <View style={styles.subscribedBox}>
                <Text style={styles.subscribedText}>
                  PEACE BE WITH YOU. YOU ARE SUBSCRIBED.
                </Text>
              </View>
            ) : (
              <View style={styles.inputWrapper}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ENTER YOUR EMAIL..."
                  placeholderTextColor="#777777"
                  style={styles.input}
                  accessibilityLabel="Newsletter email input"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={handleSubscribe}
                  accessibilityRole="button"
                  accessibilityLabel="Subscribe to newsletter"
                  style={styles.joinButton}
                >
                  {({ hovered }) => (
                    <Text
                      style={[
                        styles.joinButtonText,
                        hovered && styles.joinButtonTextHovered,
                      ]}
                    >
                      JOIN
                    </Text>
                  )}
                </Pressable>
              </View>
            )}

            <View style={styles.socialRow}>
              {['INSTAGRAM', 'X // ARCHIVE', 'SUBSTACK'].map((s, idx) => (
                <Text key={idx} style={styles.socialLink}>
                  {s}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.bottomBar, isMobile && styles.bottomBarMobile]}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} UPPERROOM APPAREL. ALL RIGHTS RESERVED. SOLUS CHRISTUS.
          </Text>

          <View style={styles.bottomLegalRow}>
            <Pressable onPress={() => navigateTo('Admin')}>
              <Text style={styles.legalText}>ATELIER ADMIN</Text>
            </Pressable>
            <Text style={styles.legalDot}>•</Text>
            <Text style={styles.legalText}>PRIVACY POLICY</Text>
            <Text style={styles.legalDot}>•</Text>
            <Text style={styles.legalText}>TERMS OF SERVICE</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.darkSection,
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: spacing['5xl'],
    paddingBottom: spacing['4xl'],
    width: '100%',
  },
  container: {
    maxWidth: 1400,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 40,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 36,
  },
  col: {
    flex: 1,
    minWidth: 200,
  },
  colBrand: {
    flex: 1.5,
    minWidth: 260,
  },
  colLinks: {
    flex: 1,
  },
  colNewsletter: {
    flex: 1.4,
    minWidth: 260,
  },
  brandTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.xl,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.brandWhite,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  tagline: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: '#AAAAAA',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  blurb: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: '#8A8A8A',
    marginBottom: spacing.md,
  },
  scriptureNote: {
    borderLeftWidth: 1.5,
    borderLeftColor: '#444444',
    paddingLeft: spacing.sm,
    marginTop: spacing.xs,
  },
  scriptureNoteText: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifRegular,
    }),
    fontSize: typography.sizes.xs,
    fontStyle: 'italic',
    color: '#777777',
    lineHeight: 18,
  },
  colHeader: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.brandWhite,
    fontWeight: '700',
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
  },
  linkItem: {
    paddingVertical: 6,
  },
  linkText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.wide,
    color: '#999999',
  },
  linkTextHovered: {
    color: colors.brandWhite,
  },
  newsletterText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: '#8A8A8A',
    marginBottom: spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    paddingBottom: 4,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.brandWhite,
    paddingVertical: 8,
    outlineStyle: 'none',
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.brandWhite,
  },
  joinButtonText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  joinButtonTextHovered: {
    color: colors.black,
  },
  subscribedBox: {
    paddingVertical: 12,
    borderLeftWidth: 2,
    borderLeftColor: colors.brandWhite,
    paddingLeft: 12,
    marginBottom: spacing.md,
  },
  subscribedText: {
    color: colors.brandWhite,
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: spacing.sm,
  },
  socialLink: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: '#777777',
  },
  divider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: spacing['3xl'],
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  bottomBarMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  copyright: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: '#666666',
    textTransform: 'uppercase',
  },
  bottomLegalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legalText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: '#666666',
    textTransform: 'uppercase',
  },
  legalDot: {
    color: '#444444',
    fontSize: 8,
  },
});

export default Footer;
