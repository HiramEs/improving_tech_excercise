import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isDisable: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, isDisable}) => {
  return (
    <Pressable onPress={onPress} style={isDisable ? styles.disableButton : styles.button} disabled={isDisable} >
      <Text style={styles.text} >{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#800080',
    width: '80%',
    height: 44,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disableButton: {
    backgroundColor: '#800080',
    width: '80%',
    height: 44,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .5
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default CustomButton