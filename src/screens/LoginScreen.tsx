import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';

type LoginScreenProps = {
  onSignIn: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({onSignIn}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const isDataComplete = username !== '' && password !== '';
  

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={username => setUsername(username)}
        style={styles.textInput}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        style={styles.textInput}
        placeholderTextColor="#ffffff"
        secureTextEntry
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
      <CustomButton title="Sign In" onPress={onSignIn} isDisable={!isDataComplete} />
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
  textInput: {
    borderRadius: 6,
    color: '#ffffff',
    fontSize: 15,
    width: '80%',
    height: 50,
    marginBottom: 15,
    backgroundColor: '#333333',
    paddingLeft: 10,
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
