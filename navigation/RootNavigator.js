import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import BagScreen from '../screens/BagScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import AdminScreen from '../screens/AdminScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import MobileTabBar from '../components/MobileTabBar';

const Stack = createNativeStackNavigator();

export const linking = {
  prefixes: [
    '/',
    'https://upperroomapparel.com',
    'upperroom://',
  ],
  config: {
    screens: {
      Home: '',
      Shop: 'shop',
      ProductDetail: 'product/:id',
      Bag: 'bag',
      About: 'about',
      Contact: 'contact',
      Admin: 'admin',
      NotFound: '*',
    },
  },
};

function ScreenWrapper({ Component, routeName, ...props }) {
  return (
    <View style={styles.screenWrapper}>
      <Component {...props} />
      <MobileTabBar activeRoute={routeName} navigation={props.navigation} />
    </View>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: colors.brandWhite },
      }}
    >
      <Stack.Screen name="Home">
        {(props) => <ScreenWrapper Component={HomeScreen} routeName="Home" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Shop">
        {(props) => <ScreenWrapper Component={ShopScreen} routeName="Shop" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="ProductDetail">
        {(props) => <ScreenWrapper Component={ProductDetailScreen} routeName="Shop" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Bag">
        {(props) => <ScreenWrapper Component={BagScreen} routeName="Bag" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="About">
        {(props) => <ScreenWrapper Component={AboutScreen} routeName="About" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Contact">
        {(props) => <ScreenWrapper Component={ContactScreen} routeName="Contact" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Admin">
        {(props) => <ScreenWrapper Component={AdminScreen} routeName="Admin" {...props} />}
      </Stack.Screen>

      <Stack.Screen name="NotFound">
        {(props) => <ScreenWrapper Component={NotFoundScreen} routeName="" {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.brandWhite,
  },
});

export default RootNavigator;
