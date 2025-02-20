import { View } from "react-native";
import { TextInput } from 'react-native-paper';
import * as React from "react";


export default function SearchScreen() {
    const [search, setSearch] = React.useState("");

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={{ width: '90%', margin: 10, borderRadius: 20 }}
                    label="Search"
                    placeholder="Search for movies and films"
                    mode="outlined"
                    value={search}
                    left={<TextInput.Icon icon="magnify" disabled />}
                    right={<TextInput.Icon icon="close" />}
                    onChangeText={search => setSearch(search)}
                />
            </View>
        </View>
    )
}