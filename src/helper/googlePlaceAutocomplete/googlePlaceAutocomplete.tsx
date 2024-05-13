import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, Place, PlaceType } from "react-native-google-places-autocomplete";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from "./styles";
import { useState } from "react";

const GooglePlacesInput = ({ onData }: any) => {

    const apiKey = 'AIzaSyBwZe1EE3F985dpD4f1V300aAk8THjQN3o'
    const [details, setDetails] = useState<GooglePlaceDetail | null>();

    const getDetails = () => {
        if (details != null) {
            onData(details);
        }
    }

    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            styles={{ container: styles.container, textInputContainer: styles.textInputContainer, textInput: styles.textInput }}
            onPress={(data, details = null) => {
                setDetails(details)
            }}
            fetchDetails={true}
            query={{
                key: apiKey,
                language: 'tr',
            }}
            onFail={(error) => {
                console.log(error);
            }}
            enablePoweredByContainer={false}
            minLength={2}
            debounce={3}
            renderRightButton={() => (
                <Pressable onPress={() => getDetails()} style={styles.btnContainer}>
                    <MaterialCommunityIcons name="map-search" size={30} color="black" />
                </Pressable>
            )}
        />
    );
};

export default GooglePlacesInput