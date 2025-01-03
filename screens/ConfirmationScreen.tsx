import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

const ConfirmationScreen = ({ navigation }: { navigation: any }) => {
    const [loaded, error] = useFonts({
        "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
        Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf"),
        MPlus: require("../assets/fonts/MPLUS1p-Medium.ttf")
    });

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
            <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: 1, paddingVertical: 20 }}>
                {/* Logo */}
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ height: height * 0.1, width: width * 0.25 }}
                        source={require("../assets/logo.png")}
                    />
                </View>

                {/* Done Text */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: "SVN-Nexa Rust Slab Black Shadow",
                            fontSize: 30,
                            textAlign: "center",
                            color: "#C71A1A",
                            marginTop: 10,
                        }}
                    >
                        Done
                    </Text>
                </View>


                {/* Like Image */}
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ height: 240, width: 210 }}
                        source={require("../assets/like.png")}
                    />
                </View>

                {/*Enjoy your noodles text*/}
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ fontFamily: "Paytone", fontSize: 25, color: "#C71A1A" }}>
                        Enjoy your noodles
                    </Text>
                    <Image style={{ height: 40, width: 40, marginLeft: 10 }} source={require("../assets/heart.png")}></Image>
                </View>

                {/* Button */}
                <View style={{ flex: 1, marginTop: 40 }}>
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
                            <Text
                                style={{
                                    fontFamily: "Paytone",
                                    fontSize: 20,
                                    fontWeight: "light",
                                    color: "#8B0000",
                                }}
                            >
                                Back to home
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 4 }}>
                                <View
                                    style={{
                                        width: 50,
                                        height: 3,
                                        backgroundColor: "#FFF",
                                        marginHorizontal: 5,
                                        borderRadius: 3,
                                    }}
                                />
                                <View
                                    style={{
                                        width: 100,
                                        height: 3,
                                        backgroundColor: "#FFF",
                                        marginHorizontal: 5,
                                        borderRadius: 3,
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/*Get them below text*/}
                    <View style={{ flex: 1, marginTop: 20 }}>
                        <Text style={{ fontFamily: "MPlus", fontSize: 25, fontWeight: "bold", textAlign: "center", color: "#F8C135" }}>Get them below</Text>
                    </View>


                </View>
            </ScrollView>
        </View>
    );
};

export default ConfirmationScreen;
