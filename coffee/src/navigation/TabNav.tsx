/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScree from '../screen/HomeScree';
import CartScreen from '../screen/CartScreen';
import FavouriteScreen from '../screen/FavouriteScreen';
import OrderHistScreen from '../screen/OrderHistScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';

import {BlurView} from '@react-native-community/blur';
import CustomIconConfig from '../component/CustomIconConfig';
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => <BlurView overlayColor="" blurAmount={13} style={styles.blur} />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScree}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIconConfig
              name="home"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIconConfig
              name="cart"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIconConfig
              name="like"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHist"
        component={OrderHistScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIconConfig
              name="bell"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    elevation: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 0,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default TabNav;
