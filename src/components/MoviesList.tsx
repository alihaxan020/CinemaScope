import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {styles} from '../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {image185} from '../api/moviedb';

const {width, height} = Dimensions.get('screen');

interface MoviesListProps {
  title: string;
  data: Array<any>;
  hideSeeAll?: boolean;
}
type RootStackParamList = {
  Movie: {id: number};
  // Define other screens if needed
};

const MoviesList: React.FC<MoviesListProps> = ({
  title,
  data,
  hideSeeAll = false,
}) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-xl">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {data.map((item, index) => {
          console.log('item: ', item.poster_path);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: item.poster_path && image185(item.poster_path),
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1 ">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}{' '}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MoviesList;
