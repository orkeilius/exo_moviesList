import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ActorCardProps {
    name: string;
    profilePicture: string;
    role: string;
}
const profileBaseURL = "https://image.tmdb.org/t/p/w500";

const ActorCard: React.FC<ActorCardProps> = ({ name, profilePicture, role }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: profileBaseURL + profilePicture }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 14,
        color: '#666',
    },
});

export default ActorCard;