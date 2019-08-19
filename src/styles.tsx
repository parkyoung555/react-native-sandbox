import {StyleSheet} from "react-native";

const theme = {
  colors: {
    primary: '#651fff',
    primaryContrast: '#ffffff',
    accent: '#e91e63',
    accentContrast: '#ffffff',
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

export default theme;
