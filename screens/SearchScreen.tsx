import { FlatList, View } from "react-native";
import { TextInput } from 'react-native-paper';
import * as React from "react";
import { getSearchMovies } from "../utils/MovieRequest";
import SmallerMovieCard from "../components/cards/SmallerMovieCard";
import { Movie } from "../types/movie";


export default function SearchScreen() {
    const [search, setSearch] = React.useState("");
    const [movies, setMovies] = React.useState<Movie[]>([]);

    React.useEffect(() => {
        getSearchMovies(search)
            .then((res) => {
                setMovies(res.results);
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
                    onChangeText={search => setSearch(search)}
                />
            </View>

            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <SmallerMovieCard
                        movie={item}
                        key={item.id}
                    />
                )}

            />

        </>
    )
}