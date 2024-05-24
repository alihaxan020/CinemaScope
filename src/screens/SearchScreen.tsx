import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import debounce from 'lodash.debounce';
import {image185, searchMovies} from '../api/moviedb';
const ios = Platform.OS == 'ios';
const {width, height} = Dimensions.get('window');
const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  let movieName = 'Ant-Man and the Wasp: Quantumania';

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        if (data && data.results) {
          console.log('====================================');
          console.log('results', data.results.length);
          console.log('====================================');

          setResults(data.results);
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView
      className={
        ios ? 'flex-1 bg-neutral-800 -mb-2' : 'flex-1 bg-neutral-800 pt-10'
      }>
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          onChangeText={text => handleTextDebounce(text)}
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-wrap justify-between flex-row">
            {results.map((item: any, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}>
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri:
                          image185(item.poster_path) ||
                          'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 16
                        ? movieName.slice(0, 16) + '...'
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Text className="text-white uppercase text-lg font-bold">
            Not Found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
