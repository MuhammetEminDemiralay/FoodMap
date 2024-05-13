import { View, Text, FlatList, Image, Dimensions, RefreshControl, Button, Pressable } from "react-native"
import { styles } from "./styles"
import { datas } from "./data"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomBtn } from "../../component"
import { addData, logout, deleteData, updateData, getData, getAllData, getQueryData } from "../../redux/userSlice"


const { width, height } = Dimensions.get('window')

const MapPage = () => {

    const ref = useRef()
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const onRefresh = () => {
        setRefreshing(true);

        // Yenileme işlemleri burada yapılır, örneğin veri yeniden getirme gibi

        // Örnek bir işlem için setTimeout kullanıldı
        setTimeout(() => {
            // Yenilenmiş veriyi ayarla
            setData([]);
            // Yenileme işlemini durdur
            setRefreshing(false);
        }, 5000); // 2 saniye sonra yenileme işlemini durdur
    };


    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    data={datas}
                    renderItem={({ item }) => (
                        <Image
                            style={{ width: width * 0.8, height: height * 0.5, borderWidth: 3, borderColor: '#fff', alignItems: 'center' }}
                            source={{ uri: item }}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    decelerationRate='normal'
                    snapToInterval={width * 0.8}
                    // onViewableItemsChanged={}
                    // viewabilityConfig={}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            // Yenileme işlemi sırasında progressView'ın pozisyonunu ayarlar
                            progressViewOffset={100}
                            // Yenileme işlemi başladığında progressView'ın rengini ayarlar
                            tintColor="#ff0000"
                            // Yenileme işlemi sırasında kullanıcının scroll yapması durumunda, progressView'ı gösterme
                            title="Yenileniyor..."
                        // Yenileme işlemi başlamadan önce yapılacak ekstra işlemler
                        // onRefreshStart={() => console.log('Yenileme işlemi başlıyor')}
                        // // Yenileme işlemi tamamlandığında yapılacak ekstra işlemler
                        // onRefreshEnd={() => console.log('Yenileme işlemi tamamlandı')}
                        />
                    }
                />
                <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />
                <CustomBtn placeholder="VERİ EKLE" onPress={() => dispatch(addData())} />
                <CustomBtn placeholder="Veri SİL" onPress={() => dispatch(deleteData())} />
                {/* <CustomBtn placeholder="Veri Güncelle" onPress={() => dispatch(updateData())} />
                <CustomBtn placeholder="Veri çek" onPress={() => dispatch(getData())} />
                <CustomBtn placeholder="Tüm veriler çek" onPress={() => dispatch(getAllData())} />
                <CustomBtn placeholder="Filtreli veriler çek" onPress={() => dispatch(getQueryData())} />
                <CustomBtn placeholder="Multi veriler çek" onPress={() => dispatch(multiSorgu())} /> */}

            </View>
        </View>
    )
}

export default MapPage