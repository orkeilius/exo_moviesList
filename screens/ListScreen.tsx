import { FlatList } from "react-native";
import SmallerMovieCard from "../components/cards/SmallerMovieCard";
import { Movie } from "../types/movie";
import {useCallback, useContext, useEffect, useState} from "react";
import {getFavorite, getWatchlist} from "../utils/MovieRequest";
import {SessionContext} from "../context/SessionContextProvider";
import {useFocusEffect} from "@react-navigation/native";

type listType = "favorite" | "watchlist";
function ListScreen({type}: Readonly<{ type: listType }>) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const session = useContext(SessionContext);

    const update= ()=> {
        if (type === "watchlist") {
            getWatchlist(session.sessionId, 1).then(r => setMovies(r.results))
        }else {

            getFavorite(session.sessionId, 1).then(r => setMovies(r.results))
        }
    }
    useEffect(() => {

        update()
    }, [session.sessionId]);
    useFocusEffect(
        useCallback(() => {
            update()
        }, [session.sessionId])
    )


    return (
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <SmallerMovieCard
                        movie={item}
                        key={item.id}
                    />
                )}

            />

    )
}

export function FavoriteScreen() {
    return <ListScreen type="favorite"/>
}
export function WatchlistScreen() {
    return <ListScreen type="watchlist"/>
}