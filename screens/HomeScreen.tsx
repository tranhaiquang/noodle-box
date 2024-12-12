import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const [loaded, error] = useFonts({
    "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust/SVN-Nexa Rust Slab Black Shadow.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LinearGradient start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} colors={["#F8A828", "#F8D838"]} className="flex-1 flexjustify-center items-center p-10">
      <View className="flex-1 items-center">
        <Image className="h-20 w-24" source={require("../assets/logo.png")}></Image>
        <Text style={{ fontFamily: "SVN-Nexa Rust Slab Black Shadow", fontSize: 40, textAlign: "center", color: "#C71A1A", marginTop: 10 }}>Welcome</Text>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
