import axios from 'axios';
import { apiKey } from '../constants';
const baseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailsEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndpoint = id => `${baseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async (endpoint, params = {}) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return {}
    }
}


export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}


export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id));
}


export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params)
}