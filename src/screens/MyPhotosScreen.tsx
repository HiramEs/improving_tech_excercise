import {FlatList, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MemeImage} from '../models/models';
import ListItem from '../components/ListItem';

export default function MyPhotosScreen() {
  const [listData, setListData] = useState<MemeImage[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);

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
    <SafeAreaView style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={item => item.id.toString()}
        data={listData}
        renderItem={({item}) => <ListItem name={item.name} url={item.url} onDelete={() => onDelete(item.id)} />}
      />
    </SafeAreaView>
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
