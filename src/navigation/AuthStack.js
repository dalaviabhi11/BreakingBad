import React, {useContext, useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BreakingBadList from '../modules/BreakingBadList';
import { NavigationContainer } from '@react-navigation/native';
import FavoriteList from '../modules/FavouriteList';
import CharacterDetail from '../modules/CharacterDetail';

const Stack = createStackNavigator();
const AuthStack = (props) => {
  return (
      <Stack.Navigator initialRouteName='BreakBad'>
        <Stack.Screen
        name='BreakBad'
        options={{headerShown: false}}
        component={BreakingBadList}
        />
         <Stack.Screen
        name='FavouriteList'
        options={{headerShown: false}}
        component={FavoriteList}
        />
         <Stack.Screen
        name='characterDetail'
        options={{headerShown: false}}
        component={CharacterDetail}
        />
      </Stack.Navigator>
  );
}
export default AuthStack;