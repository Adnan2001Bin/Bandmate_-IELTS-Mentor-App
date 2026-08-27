/** @type {import('tailwindcss').Config} */

// Deliberately value-free: colors resolve to the CSS variables emitted by
// scripts/generate-theme-css.mjs, so light and dark come from one palette file.
const semantic = (token) => `rgb(var(--color-${token}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: semantic('background'),
        surface: semantic('surface'),
        card: semantic('card'),
        text: semantic('text'),
        'text-muted': semantic('text-muted'),
        'text-subtle': semantic('text-subtle'),
        border: semantic('border'),
        divider: semantic('divider'),
        primary: semantic('primary'),
        'primary-pressed': semantic('primary-pressed'),
        'primary-soft': semantic('primary-soft'),
        'primary-text': semantic('primary-text'),
          'on-primary': semantic('on-primary'),
          secondary: semantic('secondary'),
          'secondary-pressed': semantic('secondary-pressed'),
          'on-secondary': semantic('on-secondary'),
        'inverse-surface': semantic('inverse-surface'),
        'on-inverse': semantic('on-inverse'),
        'on-inverse-muted': semantic('on-inverse-muted'),
        success: semantic('success'),
        warning: semantic('warning'),
        error: semantic('error'),
        info: semantic('info'),
      },
      // Archivo ships one file per weight; React Native cannot synthesise weights
      // for custom fonts, so each weight is its own family.
      fontFamily: {
        body: ['Archivo_400Regular'],
        'body-medium': ['Archivo_500Medium'],
        'body-semibold': ['Archivo_600SemiBold'],
        heading: ['Archivo_800ExtraBold'],
        display: ['Archivo_900Black'],
      },
      // Modernist rounds nothing. Kept as tokens so it stays tunable in one place.
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
};
