import {Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {image500} from '../api/moviedb';
const {width, height} = Dimensions.get('screen');
export default function MovieCard({item, handleClick}) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: item.poster_path && image500(item.poster_path),
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
