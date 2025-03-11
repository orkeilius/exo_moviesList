import { FlatList, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { getSearch } from "../utils/MovieRequest";
import SmallerMovieCard from "../components/cards/SmallerMovieCard";
import SmallerSerieCard from "../components/cards/SmallerSerieCard";
import { Movie } from "../types/movie";
import { Serie } from "../types/serie";
import { Text } from "react-native-paper";

import { useEffect, useState } from "react";


export default function SearchScreen() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [tvShows, setTvShows] = useState<Serie[]>([]);

    useEffect(() => {
        getSearch(search)
            .then(res => {
                setMovies(res.movies.results);
                setTvShows(res.tvShows.results);
            })
    }, [search]);


    function clearSearch() {
        setSearch("");
    }

    return (
        <>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={{ width: '90%', margin: 10, borderRadius: 20 }}
                    label="Search"
                    placeholder="Search for movies and films"
                    mode="outlined"
                    value={search}
                    left={<TextInput.Icon icon="magnify" disabled />}
                    right={search ? (<TextInput.Icon icon="close" onPress={clearSearch} />) : null}
                    onChangeText={newSearch => setSearch(newSearch)}
                />
            </View>


            <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                Films
            </Text>
            <FlatList

                data={movies}
                renderItem={({ item }) => (
                    <SmallerMovieCard
                        movie={item}
                        key={item.id}
                    />
                )}

            />


            <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                Series
            </Text>
            <FlatList
                data={tvShows}
                renderItem={({ item }) => (
                    <SmallerSerieCard
                        serie={item}
                        key={item.id}
                    />
                )}
            />

        </>
    )
}