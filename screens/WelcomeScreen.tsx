import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { storage, signIn } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Image } from 'expo-image';
import { getNoodleCount, auth } from '../config/firebase'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { setNoodleGifUrl } from "../redux/slices/noodleGifSlice";
import { setNoodleCounts } from "../redux/slices/noodleCountSlice"
import { RootState } from "../redux/store";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
type Props = {
    navigation: WelcomeScreenNavigationProp;
    route: WelcomeScreenRouteProp;
};

const WelcomeScreen = ({ navigation, route }: Props) => {
    const [loaded, error] = useFonts({
        "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
        Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf")
    });
    const dispatch = useDispatch();
    const [uid, setUid] = useState<string | undefined>(undefined);
    const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);
    const [scanResult, setScanResult] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const noodleGifUrl = useSelector((state: RootState) => state.noodleGif.noodleGifUrl);  // Get the image URL from Redux
    const noodleCounts = useSelector((state: RootState) => state.noodleCount.noodleCounts);
    const totalNoodle = noodleCounts.heartNoodle + noodleCounts.smileNoodle + noodleCounts.winkNoodle;

    const fetchNoodleGif = async () => {
        try {
            // Reference to your image in Firebase Storage
            const imageRef = ref(storage, "images/noodle-clip.gif");

            // Get the download URL
            const url = await getDownloadURL(imageRef);

            dispatch(setNoodleGifUrl(url))
        } catch (error) {
            console.error("Error fetching image: ", error);
        }
    };

    useEffect(() => {
        const result = route.params?.scanResult || '';
        setScanResult(result);

        if (scanResult) {
            const user = JSON.parse(scanResult);
            setUsername(user.username)
            setPassword(user.password)
        }
    }, [scanResult, dispatch])


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
        const fetchData = async () => {
            fetchNoodleGif();
            const noodleData = await getNoodleCount();
            if (noodleData) {
                dispatch(setNoodleCounts(noodleData));
            }
        }
        fetchData();
    }, [loaded, error, dispatch]);

    useEffect(() => {
        const handleLogin = async () => {
            if (username && password && totalNoodle !== null) {
                try {
                    await signIn(username, password)
                    const user = auth.currentUser;
                    setUid(user?.uid)
                    setIsReadyToNavigate(true)
                }
                catch (error) {
                    console.error("Login Failed")
                    navigation.navigate("Error")
                }
            }
        };
        handleLogin()
    }, [username, password, totalNoodle, uid])


    useEffect(() => {
        // Navigate only when ready
        if (isReadyToNavigate) {
            if (totalNoodle > 0) {
                navigation.navigate("Info", { uid: uid })
            }
            else {
                navigation.navigate("OutOfNoodle")
            }

        }
    }, [isReadyToNavigate, totalNoodle, navigation]);

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
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Camera", { scanResult: undefined })
                }}>
                    <Image style={{ height: 40, width: 340, marginTop: 60 }} source={require("../assets/scan-text.png")}>
                    </Image>
                </TouchableOpacity>
            </View>


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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
export default WelcomeScreen;
