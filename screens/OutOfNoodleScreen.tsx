import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebase";
import { ref, uploadBytes } from 'firebase/storage';

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

const OutOfNoodleScreen = ({ navigation }: { navigation: any }) => {
    const [loaded, error] = useFonts({
        "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
        Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf"),
        MPlus: require("../assets/fonts/MPLUS1p-Medium.ttf")
    });

    const [image, setImage] = useState("");

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) return null;

    return (
        <View style={{ flex: 1 }}>
            {/* Background */}
            <Image
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "110%",
                    resizeMode: "cover",
                }}
                source={require("../assets/bg.png")}
            />

            {/* Main Content */}
            <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: 1, paddingVertical: 200 }}>
                {/* Logo */}
                <View style={{ flex: 1, marginTop: -140 }}>
                    <Image
                        style={{ height: height * 0.1, width: width * 0.25 }}
                        source={require("../assets/logo.png")}
                    />
                </View>

                {/* Out Of Noodle Text */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: "SVN-Nexa Rust Slab Black Shadow",
                            fontSize: 30,
                            textAlign: "center",
                            color: "#C71A1A",
                        }}
                    >
                        Out Of Noodle
                    </Text>
                </View>

                {/*Please Fill Noodle Text*/}
                <View style={{ flex: 1, flexDirection: "row", marginLeft: 30, marginRight: 30 }}>
                    <Text style={{ fontFamily: "Nunito", fontSize: 20, color: "#a7a7a7", fontWeight: "bold" }}>
                        There is <Text style={{ fontFamily: "Nunito", fontSize: 20, color: "#fffcfc", fontWeight: "bold" }}>0</Text> cup of noodles left in the machine. Please fill in to continue.
                    </Text>
                </View>

                {/* Missing Noodle Image */}
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Welcome") }}>
                        <Image
                            style={{ height: 140, width: 210 }}
                            source={require("../assets/missing-noodle.png")}
                        />

                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default OutOfNoodleScreen;
