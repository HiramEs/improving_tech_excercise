import {NavigationContainer} from '@react-navigation/native';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainTabs from './src/navigation/MainTabs';
import LoginScreen from './src/screens/LoginScreen';
import * as Keychain from 'react-native-keychain';

export const SignedInContext = createContext({isSignedIn: false, setSignedIn: (value: boolean) => {}});

const App = () => {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  const checkUserStatus = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      console.log(credentials);
      if (credentials) {
        setSignedIn(true);
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <SignedInContext.Provider value={{isSignedIn, setSignedIn}}>
      <GestureHandlerRootView style={{flex: 1}}>
        {isSignedIn ? (
          <NavigationContainer>
            <MainTabs />
          </NavigationContainer>
        ) : (
          <LoginScreen onSignIn={() => setSignedIn(true)} />
        )}
      </GestureHandlerRootView>
    </SignedInContext.Provider>
  );
};

export default App;
