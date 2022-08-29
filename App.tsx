import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainTabs from './src/navigation/MainTabs';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  const signIn = () => {
    setSignedIn(true);
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isSignedIn ? (
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      ) : (
        <LoginScreen onSignIn={signIn} />
      )}
    </GestureHandlerRootView>
  );
};

export default App;
