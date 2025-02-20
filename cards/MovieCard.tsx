import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MovieCardProps = {
    title: string;
    imageUrl: string;
    onPress?: () => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl, onPress }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchList, setIsWatchList] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

                <View style={[styles.floatingIcon, styles.leftIcon]}>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <Icon name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? 'red' : undefined} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.floatingIcon, styles.rightIcon]}>
                    <TouchableOpacity onPress={() => setIsWatchList(!isWatchList)}>
                        <Icon name={isWatchList ? 'check' : 'plus'} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon name="chevron-right" size={30} color="#333" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MovieCard;

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
});