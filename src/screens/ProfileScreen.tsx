import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/TextInput';
import ProfileImage from '../components/ProfileImage';
import {ScrollView} from 'react-native-gesture-handler';
import {getDeviceName} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '../components/CustomButton';
import * as Keychain from 'react-native-keychain';

export default function ProfileScreen() {
  const [name, setName] = useState<string>('Kaladin Stormblessed');
  const [username, setUserName] = useState<string>('Kal4');
  const [contact, setContact] = useState<string>('4494442344');
  const [age, setAge] = useState<string>('23');
  const [device, setDevice] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const getDeviceInfo = async () => {
    const deviceInfo = await getDeviceName();
    setDevice(deviceInfo);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      },
      error => {
        setLatitude(error.message);
      },
      {
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const signOut =  async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getCurrentLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getCurrentLocation();
          } else {
            setLatitude('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, [getCurrentLocation, setLatitude]);

  useEffect(() => {
    getDeviceInfo();
  }, [getDeviceInfo]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ProfileImage />
        <Text style={{...styles.text, marginBottom: 10}}>Name</Text>
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={value => setName(value)}
        />
        <Text style={{...styles.text, marginBottom: 10}}>Username</Text>
        <CustomTextInput
          placeholder="Username"
          value={username}
          onChangeText={value => setUserName(value)}
        />
        <Text style={{...styles.text, marginBottom: 10}}>Contact</Text>
        <CustomTextInput
          placeholder="Contact"
          value={contact}
          onChangeText={value => setContact(value)}
          keyboard="numeric"
        />
        <Text style={{...styles.text, marginBottom: 10}}>Age</Text>
        <CustomTextInput
          placeholder="Age"
          value={age}
          onChangeText={value => setAge(value)}
          keyboard="numeric"
        />
        <View style={styles.deviceInfo}>
          <Text style={styles.infoLabel}>Device Name: </Text>
          <Text style={styles.text}>{device}</Text>
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.infoLabel}>Geolocation: </Text>
          <Text style={styles.text}>
            {latitude},{longitude}
          </Text>
        </View>
        <CustomButton title='Sign out' onPress={signOut} />
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
    marginBottom: 5
  },
  infoLabel: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
  },
});
