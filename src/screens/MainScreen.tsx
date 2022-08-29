import {FlatList, Image, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MemeImage} from '../models/models';
import CarouselItem from '../components/CarouselItem';

export default function MainScreen() {
  const [carouselData, setCarouselData] = useState<MemeImage[]>([]);
  const {width, height} = Dimensions.get('screen');
  const imageWidth = width * 0.7;
  const imageHeight = height * 0.6;

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setCarouselData(res.data.memes))
      .catch(e => {
        console.log(e);
      });
  }, [setCarouselData]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        data={carouselData}
        renderItem={({item}) => (
          <CarouselItem
            item={item}
            width={width}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        )}
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
