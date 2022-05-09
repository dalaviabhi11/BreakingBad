import React, {useContext} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import {
  appColors,
  appFontSize,
  appFontFamily
} from '../constants/appEnums';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function AppHeader(props) {
  const {setLoader} = useContext(AuthContext);

  const onBackPress = () => {
    if (props.onCancelPress) {
      setLoader(false);
      props.onCancelPress();
    }
  };

  return (
    <SafeAreaView style={[styles.headerContainer, props.headerStyle]}>
      <View style={[styles.leftContainer, { flex: props.rightIcon ? 7 : 1 }]}>
        <View style={{ marginHorizontal: props.hideBackButton ? 20 : 0 }}>
          <Text style={[styles.titleStyle, props.titleStyle]} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
        {props.rightIcon ? <View style={styles.rightContainer}>
          <View style={{ flexDirection: 'row' }}>
            {props.searchIcon ? <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={props.onSearchclick ? () => props.onSearchclick() : null}>
              <Feather name='search' size={20} color={appColors.white} />
            </TouchableOpacity> : null}

            {props.favorite ? <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={props.onFavoriteClick ? () => props.onFavoriteClick() : null}>
              <AntDesign name='heart' size={20} color={appColors.green} />
            </TouchableOpacity> : null}

            {props.cancel ? <TouchableOpacity onPress={props.onCancelPress ? () => onBackPress() : null} >
              <Entypo name="cross" size={20} color={appColors.white} />
            </TouchableOpacity> : null}
          </View> 
        </View>
        :null}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    minHeight: 60,
    backgroundColor: appColors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  rightContainer: {
    flex: 3, 
    alignItems: 'flex-end', 
    marginHorizontal: 10
  },
  titleStyle: {
    color: appColors.white,
    fontSize: appFontSize.fontSize18,
    fontFamily: appFontFamily.robotoBold,
  },
});
