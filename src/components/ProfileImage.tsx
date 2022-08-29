import {View, Text, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { profilePic } from '../assets';

const ProfileImage: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>();

  const uploadImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response?.assets) {
        setImageUri(response.assets[0].uri as string);
      }
    })
  };
  return (
    <View style={styles.container}>
      <Image source={imageUri ? {uri: imageUri} : profilePic} style={{width: 200, height: 200}} />
      <View style={styles.uploadContainer}>
        <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
          <Text>Upload Image</Text>
          <Icon name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    elevation: 2,
    overflow: 'hidden',
    marginVertical: 40,
  },
  uploadContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
