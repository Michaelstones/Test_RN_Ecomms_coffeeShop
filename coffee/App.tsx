// App.tsx

import React, {useEffect, useRef} from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from './src/navigation/TabNav';
import PaymentScreen from './src/screen/PaymentScreen';
import ProdDetails from './src/screen/ProdDetails';
import SplashScreen from 'react-native-splash-screen';
import SignUp from './src/screen/SignUp';
import {useStore} from './src/store/store';

type RootStackParamList = {
  SignUp: undefined;
  Auth: undefined;
  Tab: undefined;
  Details: {itemId: string};
  Payment: undefined;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const updateUser = useStore((state: any) => state?.updateUser);
  const user = useStore((state: any) => state?.user);

  useEffect(() => {
    SplashScreen.hide();
    const checkLoggedInUser = async () => {
      try {
        // Check if a userId exists in store
        // but normally it would have been from async storage
        const id = user?.id;

        if (id) {
          // Assuming you have a function to decode the token and fetch user data

          // Update the user in the store
          updateUser(user);

          // Navigate to the home screen (Tab)
          navigationRef.current?.navigate('Tab');
        }
      } catch (error) {
        // console.error('Error checking logged-in user:', error);
        // could implement proper measure but time is short for now
        navigationRef.current?.navigate('SignUp');
      }
    };

    checkLoggedInUser();
  }, [updateUser, user]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUp} options={{animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Tab" component={TabNav} options={{animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Details" component={ProdDetails} options={{animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation: 'slide_from_bottom'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
