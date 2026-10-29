import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';

export function HomeScreen({ navigation }) {
  const { isMobile, columns, horizontalPadding } = useBreakpoint();
  const { products } = useStore();
  const featured = products.filter((p) => p.featured);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'UpperRoom Apparel | Quiet Luxury Streetwear';
    }
  }, []);

  const handleSubscribe = () => {
    if (newsletterEmail.includes('@')) {
      setNewsletterSent(true);
      setNewsletterEmail('');
    }
  };

  return (
    <View style={styles.screen}>
      <Header activeRoute="Home" navigation={navigation} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=75',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroContent}>
                <Text style={styles.heroEyebrow}>AUTUMN / WINTER // THE SANCTUARY LINE</Text>
                <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
                  WEAR THE WORD.{'\n'}WALK IN THE SPIRIT.
                </Text>
                <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile]}>
                  Faith-inspired quiet luxury streetwear. Monolithic silhouettes crafted in pure white organic textiles for the consecrated walk.
                </Text>

                <View style={[styles.heroActions, isMobile && styles.heroActionsMobile]}>
                  <Button
                    title="SHOP THE COLLECTION"
                    variant="primary"
                    size="lg"
                    onPress={() => navigation.navigate('Shop')}
                    style={[styles.heroButton, isMobile && styles.heroButtonMobile]}
                  />
                  <Button
                    title="READ OUR STORY"
                    variant="outline"
                    size="lg"
                    onPress={() => navigation.navigate('About')}
                    style={[styles.heroButton, styles.heroSecondaryButton, isMobile && styles.heroButtonMobile]}
                    textStyle={{ color: colors.brandWhite }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.container}>
            <SectionHeading
              eyebrow="CURATED PIECES"
              title="THE PURITY CAPSULE"
              subtitle="Disciplined white silhouettes engineered with 380+ GSM combed organic cotton and invisible craftsmanship."
            />

            <View style={[styles.productGrid, { marginHorizontal: -spacing.sm }]}>
              {featured.slice(0, 4).map((product) => (
                <View
                  key={product.id}
                  style={[
                    styles.gridCol,
                    { width: `${100 / columns}%` },
                  ]}
                >
                  <ProductCard
                    product={product}
                    onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
                  />
                </View>
              ))}
            </View>

            <View style={styles.centerAction}>
              <Button
                title="EXPLORE ALL PIECES"
                variant="primary"
                size="md"
                onPress={() => navigation.navigate('Shop')}
              />
            </View>
          </View>
        </View>

        <View style={styles.storySection}>
          <View style={styles.storyContainer}>
            <Text style={styles.storyEyebrow}>ACTS 2 // THE DISPENSATION</Text>
            <Text style={styles.storyQuote}>
              “And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind...”
            </Text>
            <Text style={styles.storyCitation}>ACTS 2:1-2</Text>
            <View style={styles.storyDivider} />
            <Text style={styles.storyParagraph}>
              The Upper Room was not a monument of worldly power, but a secluded chamber of expectant waiting, repentance, and quiet prayer. UpperRoom Apparel honors this sacred space: an aesthetic of unmarred purity, uncompromised fabric weight, and garments built to bear witness without noise.
            </Text>
          </View>
        </View>

        <View style={styles.darkSection}>
          <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
            <View style={[styles.darkGrid, isMobile && styles.darkGridMobile]}>
              <View style={styles.darkImageCol}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
                  }}
                  style={styles.darkImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.darkTextCol}>
                <Text style={styles.darkEyebrow}>MONOCHROME EDITORIAL // 001</Text>
                <Text style={styles.darkTitle}>
                  THE POWER OF THE UNBLEACHED CANVAS
                </Text>
                <Text style={styles.darkBody}>
                  In a culture dominated by synthetic clamor and transient logos, we chosen the radical stillness of white.
                  White reflects all light. It forgives no shortcuts in tailoring, weaving, or finishing.
                </Text>
                <Text style={styles.darkBody}>
                  Every seam in our garments is reinforced with double-needle flatlock construction. Every scripture reference is discreetly woven into interior silk twill labels—intimate to the wearer, reverent to the Lord.
                </Text>

                <View style={styles.darkButtonRow}>
                  <Button
                    title="DISCOVER THE ARCHIVE"
                    variant="dark"
                    size="md"
                    onPress={() => navigation.navigate('Shop')}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.section, { paddingHorizontal: horizontalPadding, backgroundColor: colors.surfaceSubtle }]}>
          <View style={styles.newsletterContainer}>
            <Text style={styles.newsletterEyebrow}>PRIVATE DISPATCH</Text>
            <Text style={styles.newsletterTitle}>JOIN THE UPPER ROOM COMMUNITY</Text>
            <Text style={styles.newsletterSub}>
              Enter your email to receive early invitations to limited production capsules and contemplative devotional essays.
            </Text>

            {newsletterSent ? (
              <View style={styles.newsletterSuccess}>
                <Text style={styles.newsletterSuccessText}>
                  THANK YOU. YOUR EMAIL HAS BEEN RECORDED IN THE ARCHIVE.
                </Text>
              </View>
            ) : (
              <View style={[styles.newsletterForm, isMobile && styles.newsletterFormMobile]}>
                <TextInput
                  value={newsletterEmail}
                  onChangeText={setNewsletterEmail}
                  placeholder="NAME@DOMAIN.COM"
                  placeholderTextColor={colors.textSecondary}
                  style={styles.newsletterInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Button
                  title="SUBSCRIBE"
                  variant="primary"
                  size="md"
                  onPress={handleSubscribe}
                  style={[styles.subscribeBtn, isMobile && { width: '100%' }]}
                />
              </View>
            )}
          </View>
        </View>

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
  heroWrapper: {
    width: '100%',
    height: 640,
    backgroundColor: colors.black,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkOverlayHeavy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroContent: {
    maxWidth: 880,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: Platform.select({ web: 52, default: 36 }),
    lineHeight: Platform.select({ web: 60, default: 44 }),
    color: colors.brandWhite,
    textAlign: 'center',
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  heroSubtitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.base,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: spacing['2xl'],
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  heroButton: {
    minWidth: 200,
  },
  heroSecondaryButton: {
    borderColor: colors.brandWhite,
    backgroundColor: 'transparent',
  },
  section: {
    paddingVertical: spacing['6xl'],
    backgroundColor: colors.brandWhite,
  },
  container: {
    maxWidth: 1400,
    width: '100%',
    marginHorizontal: 'auto',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCol: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  centerAction: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  storySection: {
    paddingVertical: spacing['6xl'],
    paddingHorizontal: 24,
    backgroundColor: colors.surfaceSubtle,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderHairline,
    alignItems: 'center',
  },
  storyContainer: {
    maxWidth: 780,
    alignItems: 'center',
    textAlign: 'center',
  },
  storyEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  storyQuote: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifMedium,
    }),
    fontSize: Platform.select({ web: typography.sizes['2xl'], default: typography.sizes.xl }),
    lineHeight: Platform.select({ web: 42, default: 32 }),
    color: colors.black,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  storyCitation: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.xl,
  },
  storyDivider: {
    width: 60,
    height: 1,
    backgroundColor: colors.black,
    marginBottom: spacing.xl,
  },
  storyParagraph: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.base,
    lineHeight: 26,
    color: colors.textMuted,
    textAlign: 'center',
  },
  darkSection: {
    backgroundColor: colors.darkSection,
    paddingVertical: spacing['6xl'],
  },
  darkGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
  },
  darkGridMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  darkImageCol: {
    flex: 1,
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  darkImage: {
    width: '100%',
    height: '100%',
  },
  darkTextCol: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  darkEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: '#888888',
    marginBottom: spacing.sm,
  },
  darkTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['3xl'],
    lineHeight: typography.sizes['3xl'] * 1.15,
    color: colors.brandWhite,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  darkBody: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.base,
    lineHeight: 24,
    color: '#CCCCCC',
    marginBottom: spacing.md,
  },
  darkButtonRow: {
    marginTop: spacing.lg,
    alignSelf: 'flex-start',
  },
  newsletterContainer: {
    maxWidth: 620,
    marginHorizontal: 'auto',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  newsletterEyebrow: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  newsletterTitle: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes['2xl'],
    color: colors.black,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  newsletterSub: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  newsletterForm: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  newsletterInput: {
    flex: 1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    backgroundColor: 'transparent',
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    paddingHorizontal: 8,
    color: colors.black,
    outlineStyle: 'none',
  },
  subscribeBtn: {
    minWidth: 130,
  },
  newsletterSuccess: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.brandWhite,
    width: '100%',
  },
  newsletterSuccessText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansSemiBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    textAlign: 'center',
  },
  heroTitleMobile: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  heroSubtitleMobile: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  heroActionsMobile: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'stretch',
    gap: 12,
  },
  heroButtonMobile: {
    width: '100%',
    minWidth: '100%',
  },
  newsletterFormMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
  },
});

export default HomeScreen;
