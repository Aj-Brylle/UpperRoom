import React from 'react';
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { StoreProvider } from './context/StoreContext';
import { CartProvider, useCart } from './context/CartContext';
import { RootNavigator, linking } from './navigation/RootNavigator';
import { colors, typography } from './theme';

function AppContent() {
  const { notification } = useCart();

  return (
    <View style={styles.appRoot}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>

      {notification && (
        <View style={styles.toastContainer}>
          <View style={styles.toastCard}>
            <View style={styles.toastDot} />
            <Text style={styles.toastText}>{notification}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded && Platform.OS !== 'web') {
    return (
      <View style={styles.loaderScreen}>
        <Text style={styles.loaderBrand}>UPPERROOM</Text>
        <Text style={styles.loaderSub}>PURITY IN FORM // WALKING IN THE SPIRIT</Text>
        <ActivityIndicator size="small" color={colors.black} style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.provider}>
      <StoreProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: colors.brandWhite,
  },
  appRoot: {
    flex: 1,
    backgroundColor: colors.brandWhite,
    position: 'relative',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.brandWhite,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loaderBrand: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 8,
    color: colors.black,
    marginBottom: 8,
  },
  loaderSub: {
    fontSize: 10,
    letterSpacing: 3,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  toastContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 9999,
  },
  toastCard: {
    backgroundColor: colors.black,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.brandWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  toastDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brandWhite,
  },
  toastText: {
    color: colors.brandWhite,
    fontFamily: Platform.select({
      web: typography.webSansFallback,
      default: typography.sansMedium,
    }),
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
});
