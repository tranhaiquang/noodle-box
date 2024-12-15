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

const WelcomeScreen = () => {
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

        <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: 1, paddingVertical: 20 }}>
            <Image
                style={{
                    resizeMode: "cover",
                    position: "absolute",
                    width: "100%",
                    height: "110%",
                }}
                source={require("../assets/bg.png")}
            />
            {/* Logo and Header text */}
            <Image style={{ height: height * 0.1, width: width * 0.25 }} source={require("../assets/logo.png")} />
            <Text
                style={{
                    fontFamily: "SVN-Nexa Rust Slab Black Shadow",
                    fontSize: 40,
                    textAlign: "center",
                    color: "#C71A1A",
                    marginTop: 30,
                }}
            >
                Welcome
            </Text>

            {/* Video Section */}
            <Image style={{ height: 200, width: 340, marginTop: 30 }} source={require("../assets/Frame.png")}></Image>

            {/*Scan Text*/}
            <Image style={{ height: 40, width: 340, marginTop: 60 }} source={require("../assets/scan-text.png")}>

            </Image>
            {/* Dispense Section */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", marginTop: 120 }}>
                <Image style={{ height: 180, width: 140 }} source={require("../assets/dispense-section.png")}>

                </Image>
                <View style={{ position: "absolute", left: 160 }}>
                    <Image style={{ height: 50, width: 100, }} source={require("../assets/right-arrow.png")}></Image>
                </View>
            </View>







        </ScrollView >

    );
};

export default WelcomeScreen;
