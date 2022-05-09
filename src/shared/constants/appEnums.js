import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const screenDimensions = {
  width: windowWidth,
  height: windowHeight,
};

export const appFontFamily = {
  robotoBold: 'Roboto-Bold',
  robotoLight: 'Roboto-Light',
  robotoRegular: 'Roboto-Medium',
  robotoSemibold: 'Roboto-Regular'
};
export const appFontSize = {
  fontSize28: 28,
  fontSize26: 26,
  fontSize24: 24,
  fontSize22: 22,
  fontSize20: 20,
  fontSize18: 18,
  fontSize16: 16,
  fontSize15: 15,
  fontSize14: 14,
  fontSize13: 13,
  fontSize12: 12,
  fontSize11: 11,
  fontSize10: 10,
  fontSize9: 9,
  fontSize8: 8,
};
export const appColors = {
  green: '#18CA75',
  lightgreen: '#dfe99b',
  white: '#ffffff',
  black: '#000000',
  primaryBlack: '#3D3D3D',
  secondaryBlack: '#070707',
  bgColor: '#f7f7f7',
  gray: '#AAB1BF',
  lightGray: '#6B7382',
  veryLightGray: '#F5F5F5',
  lightBlue: '#CFE0EB',
  red: '#f36b6b',
  darkRed: '#DF4248',
  imageBorderColor: '#E1E4F5',
  addIconColor: '#C3C9D3',
  darkWhite: '#FAFAFC',
  placeHolderGrayColor: '#C4C4C4',
  shareBgColor: '#F0F4FB',
  orange: '#E7961B',
  darkGrey: '#404040',
  darkOrange: '#EC6F39',
  statusGray: '#E8E8E8',
  defaultRed: '#CA184E',
  stepGrey: '#E1E1E1',
};

