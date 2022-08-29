import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/TextInput';
import ProfileImage from '../components/ProfileImage';
import {ScrollView} from 'react-native-gesture-handler';

export default function ProfileScreen() {
  const [name, setName] = useState<string>('Kaladin Stormblessed');
  const [username, setUserName] = useState<string>('Kal4');
  const [contact, setContact] = useState<string>('4494442344');
  const [age, setAge] = useState<string>('23');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ProfileImage />
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={value => setName(value)}
        />
        <CustomTextInput
          placeholder="Username"
          value={username}
          onChangeText={value => setUserName(value)}
        />
        <CustomTextInput
          placeholder="Contact"
          value={contact}
          onChangeText={value => setContact(value)}
          keyboard="numeric"
        />
        <CustomTextInput
          placeholder="Contact"
          value={age}
          onChangeText={value => setAge(value)}
          keyboard="numeric"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
