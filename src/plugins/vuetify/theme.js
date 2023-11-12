export const staticPrimaryColor = '#3d5de2'

const theme = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        'primary': '#3d5de2',
        'on-primary': '#fff',
        'secondary': '#efebfc',
        'on-secondary': '#fff',
        'success': '#71DD37',
        'on-success': '#fff',
        'info': '#03C3EC',
        'on-info': '#fff',
        'warning': '#FFAB00',
        'on-warning': '#fff',
        'error': '#FF3E1D',
        'background': '#f5f5f5',
        'on-background': '#32475C',
        'on-surface': '#32475C',
        'grey-50': '#FAFAFA',
        'grey-100': '#EBEEF0',
        'grey-200': '#EEEEEE',
        'grey-300': '#E0E0E0',
        'grey-400': '#BDBDBD',
        'grey-500': '#9E9E9E',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
        'perfect-scrollbar-thumb': '#DBDADE',
        'skin-bordered-background': '#fff',
        'skin-bordered-surface': '#fff',
        'text-color': '#000',
        'compare-date-text': '#32475C99',
        'light-primary': '#8f95b3',
        'contract-text': '#000',
      },
      variables: {
        'code-color': '#d400ff',
        'overlay-scrim-background': '#32475C',
        'overlay-scrim-opacity': 0.5,
        'border-color': '#32475C',
        'snackbar-background': '#32475C',
        'snackbar-color': '#ffffff',
        'tooltip-background': '#262732',
        'tooltip-opacity': 0.9,
        'table-header-background': '#F5F5F7',

        // Shadows
        'shadow-key-umbra-opacity': 'rgba(var(--v-theme-on-surface), 0.06)',
        'shadow-key-penumbra-opacity': 'rgba(var(--v-theme-on-surface), 0.04)',
        'shadow-key-ambient-opacity': 'rgba(var(--v-theme-on-surface), 0.02)',
      },
    },
    dark: {
      dark: true,
      colors: {
        'primary': '#7F5CD9',
        'on-primary': '#fff',
        'secondary': '#beccfb',
        'on-secondary': '#fff',
        'success': '#71DD37',
        'on-success': '#fff',
        'info': '#03C3EC',
        'on-info': '#fff',
        'warning': '#FFAB00',
        'on-warning': '#fff',
        'error': '#FF3E1D',
        'background': '#1d1d1d',
        'on-background': '#DBDBEB',
        'surface': '#070707',
        'on-surface': '#DBDBEB',
        'grey-50': '#2A2E42',
        'grey-100': '#444463',
        'grey-200': '#4A5072',
        'grey-300': '#5E6692',
        'grey-400': '#7983BB',
        'grey-500': '#8692D0',
        'grey-600': '#AAB3DE',
        'grey-700': '#B6BEE3',
        'grey-800': '#CFD3EC',
        'grey-900': '#E7E9F6',
        'perfect-scrollbar-thumb': '#4A5072',
        'skin-bordered-background': '#2b2c40',
        'skin-bordered-surface': '#2b2c40',
        'text-color': '#070707',
        'compare-date-text': '#000',
        'light-primary': '#baadd9',
        'contract-text': '#ccc',
      },
      variables: {
        'code-color': '#d400ff',
        'overlay-scrim-background': '#0D0E24',
        'overlay-scrim-opacity': 0.6,
        'border-color': '#DBDBEB',
        'snackbar-background': '#DBDBEB',
        'snackbar-color': '#2B2C40',
        'tooltip-background': '#464A65',
        'tooltip-opacity': 0.9,
        'table-header-background': '#3A3E5B',

        // Shadows
        'shadow-key-umbra-opacity': 'rgba(20, 21, 33, 0.06)',
        'shadow-key-penumbra-opacity': 'rgba(20, 21, 33, 0.04)',
        'shadow-key-ambient-opacity': 'rgba(20, 21, 33, 0.02)',
      },
    },
  },
}

export default theme
