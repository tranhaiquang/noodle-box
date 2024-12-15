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


const InfoScreen = () => {
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

      {/* Logo */}
      <Image style={{ height: height * 0.1, width: width * 0.25 }} source={require("../assets/logo.png")} />
      <Text
        style={{
          fontFamily: "SVN-Nexa Rust Slab Black Shadow",
          fontSize: 30,
          textAlign: "center",
          color: "#C71A1A",
          marginTop: 10,
        }}
      >
        Information
      </Text>

      {/* Info Card */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          width: width * 0.9,
          marginTop: 20,
          elevation: 5,
          overflow: "hidden",
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
          {/* Avatar */}
          <Image style={{ height: 80, width: 80 }} source={require("../assets/avatar.png")} />
          {/* Labels */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            {["Full Name:", "Birthday:", "Gender:", "Department:"].map((label, idx) => (
              <Text key={idx} style={{ fontFamily: "Nunito", fontWeight: "bold", color: "#880B0B" }}>
                {label}
              </Text>
            ))}
          </View>
          {/* Values */}
          <View style={{ flex: 1 }}>
            {["Alice Mie", "12/10/1999", "Female", "Design"].map((value, idx) => (
              <Text key={idx} style={{ fontFamily: "Nunito", color: "#880B0B" }}>
                {value}
              </Text>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Noodle Cups */}
      <View style={{ flex: 1, width: "100%", zIndex: 1 }}>
        {/* Noodle Cups */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/noodle-cup.png")} style={{ width: 100, height: 180 }} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/noodle-cup-heart.png")} style={{ width: 100, height: 180 }} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/noodle-cup-smile.png")} style={{ width: 100, height: 180 }} />
          </View>
        </View>
        {/* Noodle Count */}
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "Paytone", fontSize: 16, color: "#880B0B", fontWeight: "light" }}>
            <Text style={{ color: "#C71A1A", }}>3</Text> cups of noodles left this month
          </Text>
        </View>
      </View>

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
          onPress={() => { pickImage() }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: "Paytone", fontSize: 20, fontWeight: "900", color: "#8B0000" }}>Get your noodles</Text>
            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <View style={{ width: 50, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
              <View style={{ width: 100, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>

  );
};

export default InfoScreen;
