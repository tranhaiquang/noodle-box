import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions, ScrollView, StyleSheet, Button, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { storage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Image } from 'expo-image';
import { getNoodleCount } from '../config/firebase'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

SplashScreen.hideAsync();

export default function CameraScreen({ navigation }: { navigation: any }) {

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanResult, setScanResult] = useState("");

    
    useEffect(() => {

        if (scanResult != "") {
            navigation.navigate("Welcome", {scanResult: scanResult})
        }

    })
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} onBarcodeScanned={({ data }) => {
                setScanResult(data);
            }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

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