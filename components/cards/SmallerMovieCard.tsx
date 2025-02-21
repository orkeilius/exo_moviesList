import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../../types/movie';

export type MovieCardProps = {
    movie: Movie;
    onPress?: () => void;
};
const movieBaseUrl = "https://image.tmdb.org/t/p/w500";

const SmallerMovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={{ uri: movieBaseUrl + movie.poster_path }} style={styles.image} resizeMode="cover" />
                <Text style={styles.name}>{movie.original_title}</Text>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        margin: 5
    },
    image: {
        width: 50,
        height: 80,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        width: 200,
    },
    detail: {
        fontSize: 14,
    },
});

export default SmallerMovieCard;