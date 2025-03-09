import { useEffect, useContext, useState } from 'react';
import { Text, Image, ScrollView, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { MovieDetails } from '../types/movieDetails';
import { Actor } from '../types/actor';
import { SessionContext } from '../context/SessionContextProvider';
import { getMovieDetails, getActorsMovie } from '../utils/MovieRequest';
import ActorCard from '../components/cards/ActorCard';
import { setFavorite, setWatchlist } from "../utils/CollectionRequest";
import { Button } from 'react-native-paper';

export type MovieScreenProps = {
    movie: MovieDetails;
};

export type ActorCardProps = {
    actor: Actor;
};


const MovieScreen: React.FC<{ route: { params: { movieId: number } } }> = ({ route }) => {
    const { movieId } = route.params;
    const session = useContext(SessionContext);
    const [movieData, setMovieData] = useState<MovieDetails | null>(null);
    const [actors, setActors] = useState<Actor[]>([]);


    const toggleFavorite = () => {
        setFavorite(session.sessionId, "movie", movieData.id, !movieData.favorite).then(() => {
            setMovieData({ ...movieData, favorite: !movieData.favorite })
        })
    }
    const toggleWatchList = () => {
        setWatchlist(session.sessionId, "movie", movieData.id, !movieData.watchlist).then(() => {
            setMovieData({ ...movieData, watchlist: !movieData.watchlist })
        })
    }
    useEffect(() => {
        getActorsMovie(movieId)
            .then(res => {
                setActors(res);
            }
            )
    }, []);

    useEffect(() => {
        getMovieDetails(movieId, session.sessionId)
            .then(res => {
                setMovieData(res);
            }
            )
    }, []);


    return (
        <ScrollView style={styles.container}>
            {movieData && (
                <>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }}
                        style={styles.poster}
                    />
                    {session.sessionId !== "" &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                            <View>
                                <TouchableOpacity onPress={toggleFavorite}>
                                    <Button icon={movieData.favorite ? 'heart' : 'heart-outline'} mode="contained">
                                        Favorite
                                    </Button>


                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={toggleWatchList}>
                                    <Button icon={movieData.watchlist ? 'check' : 'plus'} mode="contained">
                                        Watchlist
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
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
                    <Text style={styles.label}>Actors:</Text>
                    <FlatList
                        data={actors}
                        renderItem={({ item }) => (
                            <ActorCard
                                name={item.name}
                                profilePicture={item.profile_path}
                                role={item.character}
                            />
                        )}
                        horizontal
                    />

                    <Text style={styles.label}>Vote Average:</Text>
                    <Text>{movieData.vote_average}</Text>
                    <Text style={styles.label}>Vote Count:</Text>
                    <Text style={{ paddingBottom: 24 }}>{movieData.vote_count}</Text>
                </>
            )}
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