import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useCart } from '../context/CartContext';
import { colors, typography } from '../theme';

export function MobileTabBar({ activeRoute, navigation }) {
  const { isMobile } = useBreakpoint();
  const { totalCount } = useCart();

  if (!isMobile) return null;

  const tabs = [
    { name: 'Home', label: 'HOME', icon: '✦' },
    { name: 'Shop', label: 'SHOP', icon: '⌕' },
    { name: 'Bag', label: `BAG (${totalCount})`, icon: '□' },
    { name: 'About', label: 'STORY', icon: '✧' },
    { name: 'Admin', label: 'ADMIN', icon: '⚙' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeRoute === tab.name;
        return (
          <Pressable
            key={tab.name}
            onPress={() => navigation && navigation.navigate(tab.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab.label} tab`}
            style={styles.tabItem}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.brandWhite,
    borderTopWidth: 1,
    borderTopColor: colors.borderHairline,
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 10 : 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  tabIcon: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  tabIconActive: {
    color: colors.black,
  },
  tabLabel: {
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 9,
    letterSpacing: typography.letterSpacing.wider,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: colors.black,
    fontWeight: '700',
  },
  activeDot: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: colors.black,
  },
});

export default MobileTabBar;
