import {View, Dimensions, FlatList, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MemeImage} from '../models/models';
import ListItem from '../components/ListItem';

export default function MyPhotosScreen() {
  const [listData, setListData] = useState<MemeImage[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const {width, height} = Dimensions.get('screen');
  const imageWidth = width * 0.7;
  const imageHeight = height * 0.6;

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setListData(res.data.memes))
      .catch(e => {
        console.log(e);
      });
  }, [setListData]);

  const onRefresh = async () => {
    setIsFetching(true);
    await fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setListData(res.data.memes))
      .catch(e => {
        console.log(e);
      });
    setIsFetching(false);
  };

  const onDelete = (id: number) => {
    const newItems = listData.filter(item => item.id !== id);
    setListData(newItems);
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={item => item.id.toString()}
        data={listData}
        renderItem={({item}) => <ListItem name={item.name} url={item.url} onDelete={() => onDelete(item.id)} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});
