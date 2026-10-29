export const colors = {
  brandWhite: '#FFFFFF',
  black: '#000000',
  surfaceSubtle: '#F7F7F7',
  surfaceMuted: '#EFEFEF',
  borderHairline: '#E5E5E5',
  borderDark: '#111111',
  textSecondary: '#8A8A8A',
  textMuted: '#666666',
  darkSection: '#111111',
  darkOverlay: 'rgba(0, 0, 0, 0.45)',
  darkOverlayHeavy: 'rgba(0, 0, 0, 0.72)',
  whiteOverlay: 'rgba(255, 255, 255, 0.85)',
  neutralNotice: '#222222',
  neutralDisabled: '#CCCCCC',
  neutralDisabledText: '#999999',
};

export const typography = {
  serif: 'CormorantGaramond_600SemiBold',
  serifRegular: 'CormorantGaramond_400Regular',
  serifMedium: 'CormorantGaramond_500Medium',
  serifBold: 'CormorantGaramond_700Bold',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  webSerifFallback: "'Cormorant Garamond', 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif",
  webSansFallback: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  sizes: {
    micro: 10,
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 42,
    '4xl': 56,
    '5xl': 72,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1.5,
    wider: 2.5,
    widest: 4.0,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
  '7xl': 100,
  '8xl': 120,
};

export const breakpoints = {
  mobileMax: 767,
  tabletMin: 768,
  tabletMax: 1099,
  desktopMin: 1100,
  containerMaxWidth: 1400,
  narrowContainerMaxWidth: 900,
};

export const borders = {
  hairline: 1,
  medium: 2,
  radiusSharp: 0,
  radiusSubtle: 2,
};

export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  borders,
};

export default theme;
