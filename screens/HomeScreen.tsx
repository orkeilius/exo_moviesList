import React, {useContext, useEffect, useState} from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text, DataTable } from "react-native-paper";
import MovieCard from "../components/cards/MovieCard";
import {getFeaturedMovie, getMovieInTheatre, getUpComingMovies} from "../utils/MovieRequest";
import {Movie} from "../types/movie";
import {SessionContext} from "../context/SessionContextProvider";



export default function HomeScreen() {
    const session = useContext(SessionContext);
    const [moviesInTheatre, setMoviesInTheatre] = useState<Movie[]>([]);
    const [moviesInTheatrePage, setMoviesInTheatrePage] = useState(1);
    const [moviesInTheatreNumberOfPages, setMoviesInTheatreNumberOfPages] = useState(0);

    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);
    const [upComingMoviesPage, setUpComingMoviesPage] = useState(1);
    const [upComingMoviesNumberOfPages, setUpComingMoviesNumberOfPages] = useState(0);

    const [featuredMovie, setFeaturedMovie] = useState<Movie>(null);

    useEffect(() => {
        getFeaturedMovie()
            .then((res) => {
                setFeaturedMovie(res);
            })
            .catch(console.error);
    }, [session.sessionId]);


    useEffect(() => {
        getUpComingMovies(upComingMoviesPage,session.sessionId)
            .then((res) => {
                setUpComingMovies(res.results);
                setUpComingMoviesNumberOfPages(res.total_pages);
            })
    }, [upComingMoviesPage]);


    useEffect(() => {
        getMovieInTheatre(moviesInTheatrePage,session.sessionId)
            .then((res) => {
                setMoviesInTheatre(res.results);
                setMoviesInTheatreNumberOfPages(res.total_pages);
            })
    }
        , [moviesInTheatrePage]);

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    Featured
                </Text>
                {featuredMovie && (
                    <View style={{ alignItems: "center" }}>
                        <MovieCard
                            movie={featuredMovie}
                        />
                    </View>
                )}
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    Coming soon
                </Text>
                <FlatList
                    data={upComingMovies}
                    renderItem={({ item }) => (
                        <MovieCard
                            movie={item}
                            key={item.id}
                        />
                    )}
                    horizontal
                />


                <DataTable>
                    <DataTable.Pagination
                        page={upComingMoviesPage - 1}
                        numberOfPages={upComingMoviesNumberOfPages}
                        onPageChange={(newPage) => setUpComingMoviesPage(newPage + 1)}
                        showFastPaginationControls
                    />
                </DataTable>
            </View>


            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    In theatres
                </Text>
                <FlatList
                    data={moviesInTheatre}
                    renderItem={({ item }) => (
                        <MovieCard
                            movie={item}
                            key={item.id}
                        />
                    )}
                    horizontal
                />


                <DataTable>
                    <DataTable.Pagination
                        page={moviesInTheatrePage - 1}
                        numberOfPages={moviesInTheatreNumberOfPages}
                        onPageChange={(newPage) => setMoviesInTheatrePage(newPage + 1)}
                        showFastPaginationControls
                    />
                </DataTable>
            </View>

            
        </ScrollView>
    );

}
