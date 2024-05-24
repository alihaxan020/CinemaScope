import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';

import {styles, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const topMargin = ios ? '' : 'mt-3';
const MovieScreen = () => {
  const {params: item} = useRoute<any>();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<any>({});
  useEffect(() => {
    //call movie detail api
    setLoading(true);
    getMovieDetails(item?.id);
    getMovieCast(item?.id);
    getSimilarMovies(item?.id);
  }, [item]);
  const getMovieDetails = async (id: any) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
      setLoading(false);
    }
  };
  const getMovieCast = async (id: any) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovies = async (id: any) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster  */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 flex-row justify-between w-full items-center px-4' +
            topMargin
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
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: movie?.poster_path && image500(movie?.poster_path),
              }}
              style={{
                width,
                height: height * 0.55,
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{
                width: width,
                height: height * 0.4,
              }}
              className="absolute bottom-0"></LinearGradient>
          </View>
        )}
      </View>
      <View style={{marginTop: -height * 0.09}} className="space-y-3">
        {/* movie title here  */}
        <Text className="text-white text-3xl text-center  font-bold tracking-wider">
          {movie?.title}
        </Text>
        {/* status release runtime  */}
        {movie?.id ? (
          <Text className="text-base text-center font-semibold text-neutral-400">
            {movie?.status} - {movie?.release_date?.split('-')[0]} -{' '}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres  */}

        <View className="justify-center flex-row mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text className="font-semibold text-base text-center text-neutral-400">
                {genre?.name} {showDot ? '.' : null}
              </Text>
            );
          })}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wider">
          {movie?.overview}
        </Text>
      </View>
      {/* Cast  */}
      <Cast cast={cast} navigation={navigation} />

      {/* similiar movies  */}
      <MoviesList
        data={similarMovies}
        hideSeeAll={true}
        title="Similar Movies"
      />
    </ScrollView>
  );
};

export default MovieScreen;
