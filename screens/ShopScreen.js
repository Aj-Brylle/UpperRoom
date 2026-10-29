import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../theme';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryTab from '../components/CategoryTab';
import Button from '../components/Button';

export function ShopScreen({ route, navigation }) {
  const { isTablet, isDesktop, horizontalPadding } = useBreakpoint();
  const { products } = useStore();

  const initialCategory = route?.params?.category || 'ALL';
  const initialQuery = route?.params?.query || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Shop All Pieces | UpperRoom Apparel';
    }
  }, []);

  useEffect(() => {
    if (route?.params?.query !== undefined) {
      setSearchQuery(route.params.query);
    }
    if (route?.params?.category !== undefined) {
      setActiveCategory(route.params.category);
    }
  }, [route?.params]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'ALL') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.scripture && p.scripture.verse.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts = { ALL: products.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'ALL') {
        counts[cat] = products.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [products]);

  return (
    <View style={styles.screen}>
      <Header activeRoute="Shop" navigation={navigation} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.pageHeader, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.headerContainer}>
            <Text style={styles.pageEyebrow}>CANONICAL ARCHIVE</Text>
            <Text style={styles.pageTitle}>THE COLLECTION</Text>
            <Text style={styles.pageSubtitle}>
              Monolithic silhouettes, heavy ring-spun cottons, and disciplined white tailoring designed for everyday contemplation.
            </Text>
          </View>
        </View>

        <View style={[styles.filterBar, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.filterBarContainer}>
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="FILTER BY SCRIPTURE, SILHOUETTE, OR NAME..."
                placeholderTextColor={colors.textSecondary}
                style={styles.searchInput}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearch}>
                  <Text style={styles.clearSearchText}>✕</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.sortWrapper}>
              <Text style={styles.sortLabel}>SORT:</Text>
              {[
                { id: 'featured', label: 'FEATURED' },
                { id: 'price-asc', label: 'PRICE: LOW-HIGH' },
                { id: 'price-desc', label: 'PRICE: HIGH-LOW' },
              ].map((s) => (
                <Pressable
                  key={s.id}
                  onPress={() => setSortBy(s.id)}
                  style={[
                    styles.sortButton,
                    sortBy === s.id && styles.sortButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      sortBy === s.id && styles.sortButtonTextActive,
                    ]}
                  >
                    {s.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.mainLayout, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.mainContainer}>
            {isDesktop ? (
              <View style={styles.desktopSidebar}>
                <Text style={styles.sidebarTitle}>CATEGORIES</Text>
                <View style={styles.sidebarList}>
                  {CATEGORIES.map((cat) => (
                    <CategoryTab
                      key={cat}
                      label={cat}
                      isActive={activeCategory === cat}
                      count={categoryCounts[cat]}
                      onPress={() => setActiveCategory(cat)}
                    />
                  ))}
                </View>

                <View style={styles.sidebarNote}>
                  <Text style={styles.sidebarNoteTitle}>PURITY STANDARDS</Text>
                  <Text style={styles.sidebarNoteText}>
                    All pieces are cut from certified organic ring-spun cotton and knit in limited quantities.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.mobileTabsContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.mobileTabsScroll}
                >
                  {CATEGORIES.map((cat) => (
                    <CategoryTab
                      key={cat}
                      label={cat}
                      isActive={activeCategory === cat}
                      count={categoryCounts[cat]}
                      onPress={() => setActiveCategory(cat)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.gridArea}>
              <View style={styles.resultsInfoRow}>
                <Text style={styles.resultsCount}>
                  SHOWING {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
                  {activeCategory !== 'ALL' && ` IN ${activeCategory}`}
                </Text>
              </View>

              {filteredProducts.length > 0 ? (
                <View style={[styles.productGrid, { marginHorizontal: -spacing.xs }]}>
                  {filteredProducts.map((product) => {
                    const gridColWidth = isDesktop ? '33.333%' : isTablet ? '33.333%' : '50%';
                    return (
                      <View
                        key={product.id}
                        style={[
                          styles.gridCol,
                          { width: gridColWidth },
                        ]}
                      >
                        <ProductCard
                          product={product}
                          onPress={() =>
                            navigation.navigate('ProductDetail', { id: product.id })
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyCode}>000 // EMPTY SELECTION</Text>
                  <Text style={styles.emptyTitle}>NO PIECES FOUND</Text>
                  <Text style={styles.emptyDesc}>
                    There are no garments matching your criteria. Try adjusting your search term or exploring all collections.
                  </Text>
                  <Button
                    title="RESET FILTERS"
                    variant="primary"
                    size="md"
                    onPress={() => {
                      setActiveCategory('ALL');
                      setSearchQuery('');
                    }}
                  />
                </View>
              )}
            </View>
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
    maxWidth: 580,
  },
  filterBar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    backgroundColor: colors.brandWhite,
    paddingVertical: spacing.md,
  },
  filterBarContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    flex: 1,
    minWidth: 260,
    maxWidth: 480,
    paddingHorizontal: 4,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wide,
    paddingVertical: 6,
    color: colors.black,
    outlineStyle: 'none',
  },
  clearSearch: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  sortWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  sortLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    marginRight: 4,
  },
  sortButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sortButtonActive: {
    borderColor: colors.black,
    backgroundColor: colors.surfaceSubtle,
  },
  sortButtonText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
  },
  sortButtonTextActive: {
    color: colors.black,
    fontWeight: '700',
  },
  mainLayout: {
    paddingVertical: spacing['3xl'],
    backgroundColor: colors.brandWhite,
  },
  mainContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    flexDirection: 'row',
    gap: 40,
  },
  desktopSidebar: {
    width: 220,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: colors.borderHairline,
  },
  sidebarTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  sidebarList: {
    gap: 4,
  },
  sidebarNote: {
    marginTop: spacing['4xl'],
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
  },
  sidebarNoteTitle: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
    fontSize: 10,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.black,
    marginBottom: 4,
  },
  sidebarNoteText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  mobileTabsContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  mobileTabsScroll: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  gridArea: {
    flex: 1,
  },
  resultsInfoRow: {
    marginBottom: spacing.lg,
  },
  resultsCount: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 11,
    letterSpacing: typography.letterSpacing.widest,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCol: {
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['6xl'],
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
    fontSize: typography.sizes.xl,
    color: colors.black,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptyDesc: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
    marginBottom: spacing.xl,
  },
});

export default ShopScreen;
