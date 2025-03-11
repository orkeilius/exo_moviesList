import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SerieDetails } from '../types/serieDetails';
import { useEffect, useState } from 'react';
import { getSerieDetails } from '../utils/SerieRequest';




const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SerieScreen: React.FC<{ route: { params: { serieId: number, seriePosterPath: string } } }> = ({ route }) => {

    const { serieId } = route.params;
    const { seriePosterPath } = route.params;

    const [serieData, setSerieData] = useState<SerieDetails | null>(null);

    useEffect(() => {
        getSerieDetails(serieId)
            .then(res => {
                setSerieData(res);
            }
            )
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${seriePosterPath}` }}
                style={styles.poster}
                resizeMode="cover"
            />

            {serieData && (
                <View style={styles.content}>
                    <Text style={styles.name}>{serieData.name}</Text>
                    {serieData.tagline && serieData.tagline.trim() !== '' && (
                        <Text style={styles.tagline}>{serieData.tagline}</Text>
                    )}
                    <Text style={styles.overview}>{serieData.overview}</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>First Air Date: </Text>
                        <Text style={styles.value}>{serieData.first_air_date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Status: </Text>
                        <Text style={styles.value}>{serieData.status}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Seasons: </Text>
                        <Text style={styles.value}>{serieData.number_of_seasons}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Episodes: </Text>
                        <Text style={styles.value}>{serieData.number_of_episodes}</Text>
                    </View>
                    {serieData.genres && serieData.genres.length > 0 && (
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Genres: </Text>
                            <Text style={styles.value}>
                                {serieData.genres.map(genre => genre.name).join(', ')}
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    poster: {
        width: '100%',
        height: 400,
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    tagline: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'gray',
        marginBottom: 12,
    },
    overview: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
    },
});

export default SerieScreen;