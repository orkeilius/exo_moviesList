import React, {  useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Serie } from '../../types/serie';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type SerieCardProps = {
    serie: Serie;
};

const serieBaseUrl = "https://image.tmdb.org/t/p/w500";

const SmallerSerieCard: React.FC<SerieCardProps> = ({ serie }) => {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('SerieScreen', { serieId: serie.id, seriePosterPath: serie.poster_path })}>
            <View style={styles.card}>
                <Image source={{ uri: serieBaseUrl + serie.poster_path }} style={styles.image} resizeMode="cover" />
                <Text style={styles.name}>{serie.original_name}</Text>
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
        left: -10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        width: 200,
    },
    icon: {
        // Additional styling can be added here if needed
    }
});

export default SmallerSerieCard;