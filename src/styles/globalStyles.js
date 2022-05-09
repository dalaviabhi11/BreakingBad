import {StyleSheet} from 'react-native';
import {
  appColors,
  appFontFamily,
  appFontSize,
  screenDimensions,
} from '../shared/constants/appEnums';

export const globalStyles = StyleSheet.create({
  hitSlopeStyle: {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  },
  containerCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: '#fff',
  },
  containerCenterDarker: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: appColors.veryLightGray,
  },
  containerStretch: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    backgroundColor: '#fff',
  },
  containerStretchDarker: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    backgroundColor: appColors.veryLightGray,
  },
  phoneScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: appColors.grey,
  },
  toastMsgStyle: {
    fontSize: appFontSize.fontSize14,
    fontFamily: appFontFamily.robotoRegular,
    color: appColors.white,
    // padding: 5
  },
  flexDirRow: {
    flexDirection: 'row',
  },
  marginHorziontal16: {
    marginHorizontal: 16,
  },
  marginVertical16: {
    marginVertical: 16,
  },
  marginHorziontal20: {
    marginHorizontal: 20,
  },
  marginVertical20: {
    marginVertical: 20,
  },
  shadow: {
    shadowColor: '#fbe1b3',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  modalTransparentBackground: {
    backgroundColor: 'rgba(46, 46, 46, 0.5)',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  loader: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  labelAsterixContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  asterixStyle: {
    color: appColors.red,
  },
  marginTop10: {
    marginTop: 10,
  },
  bgImage: {
    width: screenDimensions.width,
    height: screenDimensions.height,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
  },
  welcomeStyle: {
    // marginTop: 40,
    fontFamily: appFontFamily.robotoBold,
    fontSize: appFontSize.fontSize26,
  },
  logo: {
    width: 70,
    height: 70,
  },
  loginButton: {
    width: 300,
    height: 54,
  },
  signUpMobileStyle: {
    marginTop: 12,
    fontFamily: appFontFamily.robotoRegular,
    fontSize: appFontSize.fontSize14,
    color: appColors.black,
  },
  plzEnterMobileStyle: {
    marginTop: 6,
    fontFamily: appFontFamily.robotoSemibold,
    fontSize: appFontSize.fontSize14,
    color: appColors.lightGray,
    textAlign: 'center',
  },
  rowSpaceBw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tooltipStyle: {
    width: 180,
    height: 100,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    padding: 0,
  },
  tooltipMsgStyle: {
    color: appColors.black,
    fontSize: appFontSize.fontSize14,
    fontFamily: appFontFamily.robotoSemibold,
    textAlign: 'center',
    padding: 10,
  },
  tooltipBtnStyle: {
    color: appColors.green,
    fontFamily: appFontFamily.robotoBold,
    fontSize: appFontSize.fontSize12,
  },
  alertStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
