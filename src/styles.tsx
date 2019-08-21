import {StyleSheet, Platform} from 'react-native';

const theme = {
  colors: {
    primary: '#651fff',
    primaryContrast: '#ffffff',
    accent: '#e91e63',
    accentContrast: '#ffffff',
    tertiary: '#2979ff',
    tertiaryContrast: '#ffffff',
    divider: 'rgba(0,0,0,.12)'
  },
  roundness: 8
};

export const layout = {
  unit: 8
};

export const uiDims = {
  textButton: layout.unit * 6,
  iconButton: layout.unit * 5,
  fab: layout.unit * 8
};

export const typographyStyles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginVertical: layout.unit * 2
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  }
});

export const elevation = StyleSheet.create({
  z2: {
    ...Platform.select({
      ios: {
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 2
      },
    }),
  },
  z12: {
    ...Platform.select({
      ios: {
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 12
      },
    }),
  },
});

export default theme;
