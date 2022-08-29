import { Keyboard, StyleSheet, TextInput } from 'react-native'
import React from 'react'

type TextInputProps = {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    isPassword?: boolean;
    keyboard?: 'numeric' | 'default'
}

const CustomTextInput: React.FC<TextInputProps> = ({placeholder, value, onChangeText, isPassword, keyboard}) => {
  return (
    <TextInput
        placeholder={placeholder}
        keyboardType={keyboard}
        value={value}
        onChangeText={(item) => onChangeText(item)}
        style={styles.textInput}
        placeholderTextColor="#ffffff"
        secureTextEntry={isPassword}
      />
  )
}

export default CustomTextInput;

const styles = StyleSheet.create({
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
})