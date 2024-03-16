import React, {useState } from 'react'
import { View } from 'react-native'
import MapView, { Polyline, Marker } from "react-native-maps"
import { styles } from './styles'
import mapStyle from './mapStyle.json'


// initialRegion={{
//     latitude: initialLoaction.lat,
//     longitude: initialLoaction.long,
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1
// }} 

const Map = () => {


    let [location, setLocation] = useState([{
        lat: 0,
        long: 0
    }])

 
    return (
        <View style={styles.container}>
            <MapView
                customMapStyle={mapStyle}
                style={styles.map}
                onPress={(e) => setLocation([...location, { lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude }])}
            >
                <Polyline
                    coordinates={[
                        { latitude: 37.8025259, longitude: -122.4351431 },
                        { latitude: 37.7896386, longitude: -122.421646 },
                        { latitude: 37.7665248, longitude: -122.4161628 },
                    ]} strokeColor="blue"
                    strokeWidth={5} />
                {
                    location.map((e, index) => (
                        <Marker
                            icon={require("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqnm9svloAs8_RynDjPpfp66HZ76XuHNBHrA&usqp=CAU")}
                            key={index}
                            coordinate={{ latitude: e.lat, longitude: e.long }}
                            pinColor='lime'
                        />
                    ))
                }
            </MapView>
        </View>
    )
}

export default Map
