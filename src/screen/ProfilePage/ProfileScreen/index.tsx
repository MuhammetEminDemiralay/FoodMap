import { View, Text, Alert, FlatList, Image, Dimensions, Pressable } from "react-native"
import { data } from "../../../component/followBox/data";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window")
const ProfileScreen = () => {


    const datas: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    
    const navigation: any = useNavigation();
    const refresh = () => {

    }



    return (
        <View style={styles.container}>
            <FlatList
                data={datas}

                ListHeaderComponent={() => (

                    <View style={styles.headerBox}>
                        <View style={styles.topBox}>
                            <View style={styles.profileImageBox}>
                                <Image style={styles.image} source={{ uri: data }} />
                            </View>
                        </View>
                        <View style={styles.bottomBox}>
                            <View style={styles.nameBox}>
                                <Text style={styles.nameText}>Bilbo Baggins </Text>
                            </View>
                            <View style={styles.followOptions}>
                                <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                    <Pressable style={styles.option}>
                                        <Text style={styles.optionText}>0</Text>
                                        <Text style={styles.optionText}>gönderi</Text>
                                    </Pressable>
                                </View>
                                <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                    <Pressable onPress={() => navigation.navigate("followScreen")} style={styles.option}>
                                        <Text style={styles.optionText}>0</Text>
                                        <Text style={styles.optionText}>takipçi</Text>
                                    </Pressable>
                                </View>
                                <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                    <Pressable onPress={() => navigation.navigate("followScreen")} style={styles.option}>
                                        <Text style={styles.optionText}>0</Text>
                                        <Text style={styles.optionText}>takip</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>

                )}
                ListHeaderComponentStyle={[{ width: width * 1, height: width * 1 }, styles.headerContainer]}

                renderItem={({ item }) => (

                    <View style={[{ width: width * 1 / 3, height: width * 1 / 3 }, styles.post]}>
                        <Image style={styles.postImage} source={{ uri: data }} />
                    </View>

                )}
                contentContainerStyle={[{ minHeight: height * 1 }, styles.mainContainer]}

                numColumns={3}
                showsVerticalScrollIndicator={false}
                refreshing={false}
                onRefresh={refresh}
            />
        </View>
    )
}

export default ProfileScreen