import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';

type ListItemProps = {
  name: string;
  url: string;
  onDelete: () => void;
};

const ListItem: React.FC<ListItemProps> = ({name, url, onDelete}) => {
  const renderRightActions = () => {
    return (
      <View style={styles.swipedRow}>
        <Animated.View style={styles.deleteButton}>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.text} >Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Image source={{uri: url}} resizeMode="contain" style={styles.image} />
        <Text>{name}</Text>
      </View>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 80,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  image: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
  },
  swipedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 80,
    alignSelf: 'center',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
});
