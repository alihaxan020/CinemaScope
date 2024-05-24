import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles, theme} from '../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import {fetchPersonDetails, fetchPersonMovies, image342} from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const topMargin = ios ? '' : 'my-5';
const PersonScreen = () => {
  const {params: item} = useRoute<any>();
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState<any>({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item?.id);
  }, [item]);

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
      setLoading(false);
    }
  };
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    console.log(';;;;', data);
    if (data && data.cast) {
      setPersonMovies(data.cast);
      setLoading(false);
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{
        paddingBottom: 20,
        paddingTop: ios ? 0 : 50,
      }}>
      <SafeAreaView
        className={
          'z-20 flex-row justify-between w-full items-center px-4' + topMargin
        }>
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon
            size="35"
            color={isFavorite ? theme.background : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* person details  */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 1,
              elevation: 2,
            }}>
            <View className="rounded-full h-72 w-72 item-center overflow-hidden border-2 border-neutral-500">
              <Image
                source={{
                  uri:
                    image342(person?.profile_path) ||
                    'https://global.discourse-cdn.com/turtlehead/original/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace.png',
                }}
                style={{
                  height: height * 0.45,
                  width: width * 0.74,
                }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl font-bold text-center text-white">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 justify-between flex-row items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="text-xs text-neutral-300">
                {person?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-xs text-neutral-300">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="font-semibold text-white">Known for</Text>
              <Text className="text-xs text-neutral-300">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-xs text-neutral-300">
                {person?.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View className="my-2 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || 'N/A'}
            </Text>
          </View>
          {/* person movies  */}
          <MoviesList data={personMovies} title="Movies" hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
