import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import CustomTextInput from '../components/TextInput';
import * as Keychain from 'react-native-keychain';

type LoginScreenProps = {
  onSignIn: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({onSignIn}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const isDataComplete = username !== '' && password !== '';

  const login = async () => {
    try {
      if(rememberMe) await Keychain.setGenericPassword(username, password);
    } catch (error) {
      console.log(error);
    }
  }

  const signIn = async () => {
    if(rememberMe) {
      login();
    }
    onSignIn();
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        isPassword
      />
      <View style={styles.rememberMe}>
        <CheckBox
          boxType="square"
          value={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          onCheckColor="#800080"
          onTintColor="#800080"
          tintColors={{true: '#800080'}}
          style={styles.CheckBox}
        />
        <Text style={styles.text}>Remember Me?</Text>
      </View>
      <CustomButton title="Sign In" onPress={signIn} isDisable={!isDataComplete} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
  },
  rememberMe: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: '10%',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  CheckBox: {
    marginRight: 5,
  },
});
