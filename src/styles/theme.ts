// src/styles/theme.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Base width used as design reference (standard mobile ~375px)
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const normalizeFontSize = (size: number) => {
  const scaled = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

export const theme = {
  colors: {
    forestGreen:   '#398426',
    brightFern:    '#7CB842',
    tuscanSun:     '#F3C83A',
    goldenBronze:  '#CCA530',
    bronze:        '#C17A33',
    deepWalnut:    '#4E3421',
    reddishBrown:  '#89422A',
    oliveLeaf:     '#45581D',
    champagneMist: '#F8E7CD',
    paleSky:       '#BED1DD',

    primary:    '#7CB842',
    background: '#F8E7CD',
    text:       '#4E3421',
    textMuted:  '#89422A',
    border:     '#CCA530',
    error:      '#89422A',
  },

  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },

  fontSize: {
    xs:  normalizeFontSize(10),
    sm:  normalizeFontSize(12),
    md:  normalizeFontSize(14),
    lg:  normalizeFontSize(16),
    xl:  normalizeFontSize(20),
    xxl: normalizeFontSize(26),
  },
  fontFamily: {
    regular: 'HankenGrotesk-Regular',
    medium: 'HankenGrotesk-Medium',
    semiBold: 'HankenGrotesk-SemiBold',
    bold: 'HankenGrotesk-Bold',
  },
} as const;

export type Theme = typeof theme;