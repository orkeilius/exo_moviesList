import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { MovieDetails } from '../types/movieDetails';
import { getMovieDetails } from '../utils/MovieRequest';

export type MovieScreenProps = {
    movie: MovieDetails;
};

const MovieScreen: React.FC<{ movieId: string }> = ({ movieId }) => {
    const [movieData, setMovieData] = React.useState<MovieDetails | null>(null);

    getMovieDetails(movieId)
        .then((res) => {
            setMovieData(res);
        }
        )
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }}
                style={styles.poster}
            />
            <Text style={styles.title}>{movieData.title}</Text>
            <Text style={styles.tagline}>{movieData.tagline}</Text>
            <Text style={styles.overview}>{movieData.overview}</Text>
            <Text style={styles.label}>Genres:</Text>
            <Text>{movieData.genres.map(genre => genre.name).join(', ')}</Text>
            <Text style={styles.label}>Release Date:</Text>
            <Text>{movieData.release_date}</Text>
            <Text style={styles.label}>Runtime:</Text>
            <Text>{movieData.runtime} minutes</Text>
            <Text style={styles.label}>Production Companies:</Text>
            <Text>{movieData.production_companies.map(company => company.name).join(', ')}</Text>
            <Text style={styles.label}>Vote Average:</Text>
            <Text>{movieData.vote_average}</Text>
            <Text style={styles.label}>Vote Count:</Text>
            <Text>{movieData.vote_count}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    poster: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 8,
    },
    overview: {
        fontSize: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
});

export default MovieScreen;