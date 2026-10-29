import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../theme';

export function useBreakpoint() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < breakpoints.tabletMin;
  const isTablet = width >= breakpoints.tabletMin && width < breakpoints.desktopMin;
  const isDesktop = width >= breakpoints.desktopMin;

  const columns = isDesktop ? 4 : isTablet ? 3 : 2;

  let breakpoint = 'mobile';
  if (isTablet) breakpoint = 'tablet';
  if (isDesktop) breakpoint = 'desktop';

  const horizontalPadding = isDesktop ? 64 : isTablet ? 36 : 20;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    columns,
    breakpoint,
    horizontalPadding,
    containerMaxWidth: breakpoints.containerMaxWidth,
  };
}

export default useBreakpoint;
