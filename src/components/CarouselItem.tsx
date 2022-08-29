import React from 'react'
import { Image, View } from 'react-native';

type CarouselItem = {
    item: {
      url: string;
    };
    width: number;
    imageHeight: number;
    imageWidth: number;
  };
  
const CarouselItem: React.FC<CarouselItem> = ({
    item,
    width,
    imageHeight,
    imageWidth,
  }) => {
    return (
      <View style={{width, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{uri: item.url}}
          resizeMode="cover"
          style={{height: imageHeight, width: imageWidth, borderRadius: 16}}
        />
      </View>
    );
  };

  export default CarouselItem;
  