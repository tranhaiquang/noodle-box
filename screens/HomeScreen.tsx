import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebase";
import { createStackNavigator } from "@react-navigation/stack";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const [loaded, error] = useFonts({
        "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
        Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf")
    });

    const [image, setImage] = useState("");

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) return null;

    // Pick Image Function
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (

        <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: 1, paddingVertical: 20, }}>
            <Image
                style={{
                    resizeMode: "cover",
                    position: "absolute",
                    width: "100%",
                    height: "110%",

                }}
                source={require("../assets/bg.png")}
            />


            <View style={{ flex: 1, justifyContent: "space-evenly" }}>

                {/* Button */}
                <View style={{ zIndex: 0 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#FFA500",
                            borderRadius: 25,
                            paddingVertical: 12,
                            width: width * 0.7,
                            alignItems: "center",
                            elevation: 5,
                        }}
                        onPress={() => { navigation.navigate("Info") }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: "Paytone", fontSize: 20, fontWeight: "900", color: "#8B0000" }}>Info</Text>
                            <View style={{ flexDirection: "row", marginTop: 4 }}>
                                <View style={{ width: 50, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                                <View style={{ width: 100, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ zIndex: 0 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#FFA500",
                            borderRadius: 25,
                            paddingVertical: 12,
                            width: width * 0.7,
                            alignItems: "center",
                            elevation: 5,
                        }}
                        onPress={() => { navigation.navigate("Welcome") }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: "Paytone", fontSize: 20, fontWeight: "900", color: "#8B0000" }}>Welcome</Text>
                            <View style={{ flexDirection: "row", marginTop: 4 }}>
                                <View style={{ width: 50, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                                <View style={{ width: 100, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>


        </ScrollView>

    );
};

export default WelcomeScreen;
