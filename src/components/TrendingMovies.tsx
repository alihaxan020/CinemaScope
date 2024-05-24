import {Dimensions, Text, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
interface TrendingProps {
  trending: string[];
}
const {width, height} = Dimensions.get('screen');
const TrendingMovies: React.FC<TrendingProps> = ({trending}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const handleClick = (item: any) => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8 mt-2">
      <Text className="mb-5 mx-4 text-xl text-white">Trending</Text>
      <Carousel
        layout={'default'}
        data={trending}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.62}
        inactiveSlideOpacity={0.6}
        slideStyle={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default TrendingMovies;
