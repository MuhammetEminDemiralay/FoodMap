import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import MapView, { MapPressEvent, Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import GooglePlacesInput from '../../../helper/googlePlaceAutocomplete/googlePlaceAutocomplete'
import PostOptionBox from '../../../component/postOptionBox/postOptionBox'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, list, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../../firebaseConfig'
import uuid from 'react-native-uuid'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { locationInfo } from '../../../model/locationInfo'
import { PostFile } from '../../../model/postFile'
import { collection } from 'firebase/firestore'
import { addPost } from '../../../redux/postSlice'
import { PostData } from '../../../model/postData'
import { addFile } from '../../../redux/fileSlice'



const LocationScreen = () => {

  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const { files }: PostFile = useSelector((state: any) => state.post)
  const { uid } = useSelector((state: any) => state.user)

  const [currentLocation, setCurrentLocation] = useState<locationInfo>({ lat: 0, long: 0 })
  const [markedLocation, setMarkedLocation] = useState<locationInfo | null>({ lat: 0, long: 0 });
  const [locationDetails, setLocationDetails] = useState<GooglePlaceDetail>();
  const [selectedOption, setSelecetedOption] = useState<string>("currentLocation");
  const [url, setUrl] = useState<string>();


  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Her saniye güncelleme al
          distanceInterval: 10 // Her 10 metrede güncelleme al
        },
        (currentLocation) => {
          setCurrentLocation({ lat: currentLocation.coords.latitude, long: currentLocation.coords.longitude })
        }
      );

      return () => {
        // Component kaldırıldığında izlemeyi durdur
        subscription.remove();
      };
    })();
  }, []);


  const handlePost = () => {
    const documentId = uuid.v4();
    const postData : PostData = {
      userId: uid,
      documentId: documentId,
      lat: markedLocation ? markedLocation.lat : currentLocation.lat,
      long: markedLocation ? markedLocation.long : currentLocation.long,
    }
    const fileData : PostFile = {
      userId : uid,
      documentId : documentId
    }
    dispatch(addFile(fileData))
    dispatch(addPost(postData))
    
  }




  const getImage = async () => {
    const url = await getDownloadURL(ref(storage, 'images/null/8c92cef2-88c0-4a20-8f3f-0eb27106155b.jpeg'))
    setUrl(url);
  }

  const [imageList, setImageList] = useState<[]>([]);
  const listFolder = async () => {
    const result = await list(ref(storage, `images/${uid}.id/1.post`))

    result.items.forEach((doc) => [...imageList, doc.name]);

    console.log(imageList);
    result.prefixes.forEach((folder) => console.log(folder.name))
  }

  const getMarkedLocation = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent
    setMarkedLocation({ lat: coordinate.latitude, long: coordinate.longitude })
  }

  const selectedLocationChange = () => {
    if (selectedOption != "currentLocation") {
      setSelecetedOption("currentLocation");
      setMarkedLocation(null)
    } else {
      setSelecetedOption("markedLocation")
    }
  }

  const handleData = (data: GooglePlaceDetail) => {
    setLocationDetails(data);
    setMarkedLocation({ lat: data?.geometry.location.lat, long: data?.geometry.location.lng })
  }


  return (
    <View style={styles.container} >
      <GooglePlacesInput onData={handleData} />
      <MapView
        style={styles.mapContainer}
        loadingEnabled={true}
        initialRegion={{
          latitude: currentLocation ? currentLocation.lat : 38.963745,
          longitude: currentLocation ? currentLocation.long : 35.243320,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }}
        region={{
          latitude: markedLocation ? markedLocation.lat : currentLocation.lat,
          longitude: markedLocation ? markedLocation.long : currentLocation.long,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
        onPress={getMarkedLocation}
        showsUserLocation={true}
        showsScale={true}
        showsMyLocationButton={true}
        userLocationUpdateInterval={2000}
        userLocationPriority='high'
        userLocationFastestInterval={2000}
        userInterfaceStyle='dark'

      >
        {
          markedLocation && (selectedOption != null) &&
          <Marker
            pinColor='red'
            coordinate={{ latitude: markedLocation.lat, longitude: markedLocation.long }}
          />
        }
      </MapView>
      <PostOptionBox handlePost={handlePost} markedLocation={markedLocation} selectedOption={selectedOption} selectedLocationChange={selectedLocationChange} />
    </View>
  )

}

export default LocationScreen
