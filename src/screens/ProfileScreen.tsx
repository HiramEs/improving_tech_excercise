import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/TextInput';
import ProfileImage from '../components/ProfileImage';
import {ScrollView} from 'react-native-gesture-handler';
import {getDevice, getDeviceName} from 'react-native-device-info';

export default function ProfileScreen() {
  const [name, setName] = useState<string>('Kaladin Stormblessed');
  const [username, setUserName] = useState<string>('Kal4');
  const [contact, setContact] = useState<string>('4494442344');
  const [age, setAge] = useState<string>('23');
  const [device, setDevice] = useState<string>('');

  const getDeviceInfo = async () => {
    const deviceInfo = await getDeviceName();
    setDevice(deviceInfo);
  };

  useEffect(() => {
    getDeviceInfo();
  });

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
        <View style={styles.deviceInfo}>
          <Text style={styles.infoLabel}>Device Name: </Text>
          <Text style={styles.text}>{device}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  infoLabel: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});
