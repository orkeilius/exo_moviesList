import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text, DataTable } from "react-native-paper";
import MovieCard from "../components/cards/MovieCard";
import { getSeries } from "../utils/SerieRequest";
import { Serie } from "../types/serie";
import SerieCard from "../components/cards/SerieCard";

import { getFeaturedMovie, getMovieInTheatre, getUpComingMovies } from "../utils/MovieRequest";
import { Movie } from "../types/movie";
import { SessionContext } from "../context/SessionContextProvider";




export default function HomeScreen() {
    const session = useContext(SessionContext);
    const [moviesInTheatre, setMoviesInTheatre] = useState<Movie[]>([]);
    const [moviesInTheatrePage, setMoviesInTheatrePage] = useState(1);
    const [moviesInTheatreNumberOfPages, setMoviesInTheatreNumberOfPages] = useState(0);

    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);
    const [upComingMoviesPage, setUpComingMoviesPage] = useState(1);
    const [upComingMoviesNumberOfPages, setUpComingMoviesNumberOfPages] = useState(0);


    const [series, setSeries] = useState<Serie[]>([]);
    const [seriesPage, setSeriesPage] = useState(1);
    const [seriesNumberOfPages, setSeriesNumberOfPages] = useState(0);

    const [featuredMovie, setFeaturedMovie] = useState<Movie>(null);

    useEffect(() => {
        getFeaturedMovie()
            .then(res => {
                setFeaturedMovie(res);
            })
            .catch(console.error);
    }, [session.sessionId]);


    useEffect(() => {
        getUpComingMovies(upComingMoviesPage, session.sessionId)
            .then(res => {
                setUpComingMovies(res.results);
                setUpComingMoviesNumberOfPages(res.total_pages);
            })
    }, [upComingMoviesPage, session.sessionId]);

    useEffect(() => {

        getSeries(seriesPage)
            .then(res => {
                setSeries(res.results);
                setSeriesNumberOfPages(res.total_pages);
            })
    }, [seriesPage, session.sessionId]);

    useEffect(() => {
        getMovieInTheatre(moviesInTheatrePage, session.sessionId)
            .then(res => {
                setMoviesInTheatre(res.results);
                setMoviesInTheatreNumberOfPages(res.total_pages);
            })
    }, [moviesInTheatrePage, session.sessionId]);

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
                            isfeatured
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
                        onPageChange={newPage => setUpComingMoviesPage(newPage + 1)}
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
                        onPageChange={newPage => setMoviesInTheatrePage(newPage + 1)}
                        showFastPaginationControls
                    />
                </DataTable>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    Series
                </Text>
                <FlatList
                    data={series}
                    renderItem={({ item }) => (
                        <SerieCard
                            serie={item}
                            key={item.id}
                        />
                    )}
                    horizontal
                />


                <DataTable>
                    <DataTable.Pagination
                        page={seriesPage - 1}
                        numberOfPages={seriesNumberOfPages}
                        onPageChange={newPage => setSeriesPage(newPage + 1)}
                        showFastPaginationControls
                    />
                </DataTable>
            </View>


        </ScrollView>
    );

}
