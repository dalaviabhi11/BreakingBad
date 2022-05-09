import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { appColors, appFontFamily, appFontSize, colors } from '../constants/appEnums';

export default function Footer(props) {
  return (
    <View style={[styles.footer, props.style]}>
        {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute', 
    bottom: 10, 
    alignItems:'center', 
    justifyContent: 'flex-end',
    backgroundColor: appColors.grey,
    // padding: 10,
  }
});
