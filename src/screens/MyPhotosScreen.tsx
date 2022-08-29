import {FlatList, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MemeImage} from '../models/models';
import ListItem from '../components/ListItem';

export default function MyPhotosScreen() {
  const [listData, setListData] = useState<MemeImage[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const fetchData = async () => {
    await fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setListData(res.data.memes))
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setIsFetching(true);
    fetchData();
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
        maxToRenderPerBatch={20}
        initialNumToRender={20}
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
