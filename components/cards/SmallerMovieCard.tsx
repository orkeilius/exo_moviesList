import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../../types/movie';
import {useNavigation} from "@react-navigation/native";
import {SessionContext} from "../../context/SessionContextProvider";
import {setFavorite, setWatchlist} from "../../utils/CollectionRequest";
import {Text} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MovieCardProps = {
    movie: Movie;
};
const movieBaseUrl = "https://image.tmdb.org/t/p/w500";

const SmallerMovieCard: React.FC<MovieCardProps> = ({ movie}) => {
    const navigation = useNavigation<any>();
    const session = useContext(SessionContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchList, setIsWatchList] = useState(false);

    useEffect(() => {
        setIsFavorite(movie.favorite);
        setIsWatchList(movie.watchlist);
    }, [movie]);

    const toggleFavorite = () => {
        setFavorite(session.sessionId, "movie",movie.id, !isFavorite).then(() => {
            setIsFavorite(!isFavorite)
        })
    }


    const toggleWatchList = () => {
        setWatchlist(session.sessionId, "movie", movie.id, !isWatchList).then(() => setIsWatchList(!isWatchList))
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieScreen', { movieId: movie.id })}>
            <View style={styles.card}>
                <Image source={{ uri: movieBaseUrl + movie.poster_path }} style={styles.image} resizeMode="cover" />
                <Text style={styles.name}>{movie.original_title}</Text>
                <View style={[styles.icon]}>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <Icon name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? 'red' : undefined} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.icon]}>
                    <TouchableOpacity onPress={toggleWatchList}>
                        <Icon name={isWatchList ? 'check' : 'plus'} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        left:-10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        width: 200,
    },
    detail: {
        fontSize: 14,
    },
    icon:{

    }
});

export default SmallerMovieCard;