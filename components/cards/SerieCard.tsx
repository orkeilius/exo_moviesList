import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setFavorite, setWatchlist } from "../../utils/CollectionRequest";
import { Serie } from "../../types/serie";
import { SessionContext } from "../../context/SessionContextProvider";
import { useNavigation } from '@react-navigation/native';

export type SerieCardProps = {
    serie: Serie;
    onPress?: () => void;
    isFeatured?: boolean;
};

const serieBaseUrl = "https://image.tmdb.org/t/p/w500";

const SerieCard: React.FC<SerieCardProps> = ({ serie, isFeatured }) => {
    const session = useContext(SessionContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchList, setIsWatchList] = useState(false);
    const navigation = useNavigation<any>();


    useEffect(() => {
        setIsFavorite(serie.favorite);
        setIsWatchList(serie.watchlist);
    }, [serie]);

    const toggleFavorite = () => {
        setFavorite(session.sessionId, "tv", serie.id, !isFavorite).then(() => setIsFavorite(!isFavorite));
    };

    const toggleWatchList = () => {
        setWatchlist(session.sessionId, "tv", serie.id, !isWatchList).then(() => setIsWatchList(!isWatchList));
    };

    return (
        <View style={{ width: 300 }}>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SerieScreen', { serieId: serie.id, seriePosterPath:serie.poster_path })}>
                <Image source={{ uri: serieBaseUrl + serie.poster_path }} style={styles.image} resizeMode="cover" />
                {session.sessionId !== "" && !isFeatured &&
                    <>
                        <View style={[styles.floatingIcon, styles.leftIcon]}>
                            <TouchableOpacity onPress={toggleFavorite}>
                                <Icon name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? 'red' : undefined} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.floatingIcon, styles.rightIcon]}>
                            <TouchableOpacity onPress={toggleWatchList}>
                                <Icon name={isWatchList ? 'check' : 'plus'} size={30} />
                            </TouchableOpacity>
                        </View>
                    </>
                }

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{serie.name}</Text>
                    <Icon name="chevron-right" size={30} color="#333" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default SerieCard;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 300,
        height: 400,
    },
    floatingIcon: {
        position: 'absolute',
        top: 10,
        backgroundColor: 'rgba(210, 210, 210, 0.65)',
        borderColor: 'rgba(210, 210, 210, 1)',
        borderWidth: 1,
        borderRadius: 50,
        padding: 5,
    },
    leftIcon: {
        left: 10,
    },
    rightIcon: {
        right: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        maxWidth: 250,
    },
})