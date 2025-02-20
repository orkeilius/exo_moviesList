import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text, DataTable } from "react-native-paper";
import MovieCard from "../cards/MovieCard";
import { getFeaturedMovie, getMonthMovies } from "../api";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export default function HomeScreen() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const imageUrl = "https://image.tmdb.org/t/p/w500/";
    const [featuredMovie, setFeaturedMovie] = useState<Movie>(null);


    // Calculate start and end dates for the current month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const monthStr = month.toString().padStart(2, "0");
    const startDate = `${year}-${monthStr}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${monthStr}-${lastDay.toString().padStart(2, "0")}`;


    useEffect(() => {
        getFeaturedMovie()
            .then((res) => {
                setFeaturedMovie(res);
            })
            .catch(console.error);
    }, []);


    useEffect(() => {
        getMonthMovies(page, startDate, endDate)
            .then((res) => {
                setMovies(res.results);
                setNumberOfPages(res.total_pages);
            })
    }, [page, startDate, endDate]);

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    Featured
                </Text>
                {featuredMovie && (
                    <View style={{ alignItems: "center" }}>
                        <MovieCard
                            title={featuredMovie.title}
                            imageUrl={`${imageUrl}${featuredMovie.poster_path}`}
                            key={featuredMovie.id}
                        />
                    </View>
                )}
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>
                    Coming soon
                </Text>
                <FlatList
                    data={movies}
                    renderItem={({ item }) => (
                        <MovieCard
                            title={item.title}
                            imageUrl={`${imageUrl}${item.poster_path}`}
                            key={item.id}
                        />
                    )}
                    horizontal
                />


                <DataTable>
                    <DataTable.Pagination
                        page={page - 1}
                        numberOfPages={numberOfPages}
                        onPageChange={(newPage) => setPage(newPage + 1)}
                        showFastPaginationControls
                    />
                </DataTable>
            </View>
        </ScrollView>
    );

}
