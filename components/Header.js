import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, TextInput } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useCart } from '../context/CartContext';
import { colors, typography } from '../theme';

export function Header({
  activeRoute = 'Home',
  navigation,
  inverted = false,
  onSearchSubmit,
}) {
  const { isMobile } = useBreakpoint();
  const { totalCount } = useCart();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (routeName, params) => {
    if (navigation) {
      navigation.navigate(routeName, params);
    }
    setMobileMenuOpen(false);
  };

  const handleSearchCommit = () => {
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    } else if (navigation) {
      navigation.navigate('Shop', { query: searchQuery });
    }
    setShowSearchInput(false);
  };

  const wordmarkColor = inverted ? colors.brandWhite : colors.black;
  const linkColor = inverted ? 'rgba(255, 255, 255, 0.85)' : colors.black;
  const activeLinkColor = inverted ? colors.brandWhite : colors.black;
  const headerBg = inverted ? 'transparent' : colors.brandWhite;
  const borderColor = inverted ? 'rgba(255, 255, 255, 0.15)' : colors.borderHairline;

  return (
    <View style={[styles.headerContainer, { backgroundColor: headerBg, borderBottomColor: borderColor }]}>
      <View style={styles.innerContent}>
        {!isMobile ? (
          <View style={styles.leftNav}>
            {[
              { label: 'SHOP', route: 'Shop' },
              { label: 'ABOUT', route: 'About' },
              { label: 'CONTACT', route: 'Contact' },
              { label: 'ADMIN', route: 'Admin' },
            ].map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <Pressable
                  key={link.route}
                  onPress={() => handleNavigate(link.route)}
                  accessibilityRole="link"
                  accessibilityLabel={`Navigate to ${link.label}`}
                  style={styles.navLink}
                >
                  {({ hovered }) => (
                    <View style={styles.linkWrapper}>
                      <Text
                        style={[
                          styles.navLinkText,
                          { color: linkColor },
                          (isActive || hovered) && { color: activeLinkColor, fontWeight: '700' },
                        ]}
                      >
                        {link.label}
                      </Text>
                      {isActive && (
                        <View style={[styles.activeIndicator, { backgroundColor: activeLinkColor }]} />
                      )}
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Pressable
            onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
            accessibilityRole="button"
            accessibilityLabel="Toggle navigation menu"
            style={styles.mobileIconButton}
          >
            <Text style={[styles.mobileMenuIcon, { color: wordmarkColor }]}>
              {mobileMenuOpen ? '✕' : '☰'}
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => handleNavigate('Home')}
          accessibilityRole="link"
          accessibilityLabel="UpperRoom Apparel Home"
          style={styles.wordmarkContainer}
        >
          <Text style={[styles.wordmark, { color: wordmarkColor }]}>
            UPPERROOM
          </Text>
          <Text style={[styles.wordmarkSub, { color: inverted ? 'rgba(255,255,255,0.7)' : colors.textSecondary }]}>
            APPAREL
          </Text>
        </Pressable>

        <View style={styles.rightNav}>
          {showSearchInput ? (
            <View style={styles.searchBarWrapper}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="SEARCH PIECES..."
                placeholderTextColor={colors.textSecondary}
                onSubmitEditing={handleSearchCommit}
                autoFocus
                style={[
                  styles.searchInput,
                  { color: wordmarkColor, borderColor: wordmarkColor },
                ]}
              />
              <Pressable
                onPress={() => setShowSearchInput(false)}
                style={styles.closeSearchButton}
              >
                <Text style={{ color: wordmarkColor, fontSize: 13 }}>✕</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setShowSearchInput(true)}
              accessibilityRole="button"
              accessibilityLabel="Search catalog"
              style={styles.iconButton}
            >
              {({ hovered }) => (
                <Text
                  style={[
                    styles.navLinkText,
                    { color: linkColor },
                    hovered && { color: activeLinkColor },
                  ]}
                >
                  SEARCH
                </Text>
              )}
            </Pressable>
          )}

          <Pressable
            onPress={() => handleNavigate('Bag')}
            accessibilityRole="link"
            accessibilityLabel={`Shopping Bag, ${totalCount} items`}
            style={styles.bagLink}
          >
            {({ hovered }) => (
              <View style={styles.bagRow}>
                <Text
                  style={[
                    styles.navLinkText,
                    { color: linkColor },
                    (activeRoute === 'Bag' || hovered) && {
                      color: activeLinkColor,
                      fontWeight: '700',
                    },
                  ]}
                >
                  BAG
                </Text>
                <View
                  style={[
                    styles.bagBadge,
                    {
                      backgroundColor: inverted ? colors.brandWhite : colors.black,
                      borderColor: inverted ? colors.brandWhite : colors.black,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.bagBadgeText,
                      { color: inverted ? colors.black : colors.brandWhite },
                    ]}
                  >
                    {totalCount}
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {isMobile && mobileMenuOpen && (
        <View style={styles.mobileDropdown}>
          {[
            { label: 'HOME', route: 'Home' },
            { label: 'SHOP COLLECTION', route: 'Shop' },
            { label: 'ABOUT THE UPPER ROOM', route: 'About' },
            { label: 'CLIENT CONCIERGE', route: 'Contact' },
            { label: 'ADMIN ATELIER', route: 'Admin' },
            { label: `BAG (${totalCount})`, route: 'Bag' },
          ].map((item) => (
            <Pressable
              key={item.route}
              onPress={() => handleNavigate(item.route)}
              style={styles.mobileMenuItem}
            >
              <Text
                style={[
                  styles.mobileMenuText,
                  activeRoute === item.route && styles.mobileMenuTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 1,
    zIndex: 100,
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
  },
  innerContent: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    height: 72,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 28,
  },
  navLink: {
    paddingVertical: 8,
  },
  linkWrapper: {
    position: 'relative',
    paddingBottom: 4,
  },
  navLinkText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wider,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
  },
  wordmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  wordmark: {
    fontFamily: Platform.select({
      web: typography.webSerifFallback,
      default: typography.serifBold,
    }),
    fontSize: typography.sizes.xl,
    letterSpacing: typography.letterSpacing.widest,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  wordmarkSub: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: 8,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: 20,
  },
  iconButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  bagLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  bagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bagBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bagBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansBold,
    }),
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    borderBottomWidth: 1,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sans,
    }),
    fontSize: typography.sizes.xs,
    letterSpacing: typography.letterSpacing.wide,
    paddingVertical: 4,
    paddingHorizontal: 6,
    minWidth: 140,
    outlineStyle: 'none',
  },
  closeSearchButton: {
    padding: 4,
  },
  mobileIconButton: {
    padding: 8,
  },
  mobileMenuIcon: {
    fontSize: 22,
    fontWeight: '300',
  },
  mobileDropdown: {
    backgroundColor: colors.brandWhite,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  mobileMenuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
  },
  mobileMenuText: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: typography.sizes.sm,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.black,
    fontWeight: '500',
  },
  mobileMenuTextActive: {
    fontWeight: '700',
  },
});

export default Header;
