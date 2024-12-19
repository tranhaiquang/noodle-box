import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Image } from 'expo-image';
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const [loaded, error] = useFonts({
        "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
        Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf")
    });

    const [image, setImage] = useState("");
    const [noodleGifUrl, setNoodleGifUrl] = useState("");

    const fetchNoodleGif = async () => {
        try {
            // Reference to your image in Firebase Storage
            const imageRef = ref(storage, "images/noodle-clip.gif");

            // Get the download URL
            const url = await getDownloadURL(imageRef);

            setNoodleGifUrl(url)
        } catch (error) {
            console.error("Error fetching image: ", error);
        }
    };
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
        fetchNoodleGif();
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
            <View>
                <Image style={{ height: height * 0.1, width: width * 0.25 }} source={require("../assets/logo.png")} />
            </View>
            <View>
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
            </View>

            {/* Video Section */}
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    width: width * 0.9,
                    height: 217,
                    marginTop: 20,

                }}
            >

                <LinearGradient
                    colors={["#F8A828", "#F8D838"]}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 2,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "#880B0B",
                        borderRadius: 10,
                    }}
                >
                    {
                        noodleGifUrl && (
                            <Image
                                style={{
                                    width: 330,
                                    height: 190,
                                }}
                                source={{ uri: noodleGifUrl }}
                            />
                        )
                    }

                </LinearGradient>

            </View>

            {/*Scan Text*/}
            <View>
                <Image style={{ height: 40, width: 340, marginTop: 60 }} source={require("../assets/scan-text.png")}>
                </Image>
            </View>


            {/* Dispense Section */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", marginTop: 120 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Info") }}>
                    <Image style={{ height: 180, width: 140 }} source={require("../assets/dispense-section.png")}>
                    </Image>
                </TouchableOpacity>

                <View style={{ position: "absolute", left: 160 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Error") }}>
                        <Image style={{ height: 50, width: 100, }} source={require("../assets/right-arrow.png")}></Image>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView >

    );
};

export default WelcomeScreen;
