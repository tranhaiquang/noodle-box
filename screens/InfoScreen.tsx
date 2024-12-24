import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebase";
import { ref, uploadBytes } from 'firebase/storage';
import { db, } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");


const InfoScreen = ({ navigation }: { navigation: any }) => {
  const [fontLoaded, error] = useFonts({
    "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf")
  });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  // First Noodle Cup
  const [isSmileNoodleSelected, setSmileNoodleSelected] = useState(false);
  // Second Noodle Cup
  const [isHeartNoodleSelected, setHeartNoodleSelected] = useState(false);
  // Third Noodle Cup
  const [isWinkNoodleSelected, setWinkNoodleSelected] = useState(false)


  const [noodleCounts, setNoodleCounts] = useState({
    heartNoodle: 0,
    smileNoodle: 0,
    winkNoodle: 0,

  });

  const totalNoodle = noodleCounts.heartNoodle + noodleCounts.smileNoodle + noodleCounts.winkNoodle;


  const getNoodleCount = async () => {
    try {
      // Reference to the document you want to fetch
      const docRef = doc(db, "noodle-box", "noodle-count") // Replace 'noodles' with your collection and 'document-id' with the document ID

      // Fetch the document
      const documentSnapshot = await getDoc(docRef)

      if (documentSnapshot.exists()) {
        setNoodleCounts({
          heartNoodle: documentSnapshot.data().heartNoodle,
          smileNoodle: documentSnapshot.data().smileNoodle,
          winkNoodle: documentSnapshot.data().winkNoodle,
        });
      } else {
        console.log("No such document!");
        return -1;
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  // update noodle count when users click "Get your noodles"
  const updateNoodleCount = async (fieldId: string, count: number) => {
    const docRef = doc(db, "noodle-box", "noodle-count");
    await setDoc(docRef, { [fieldId]: count }, { merge: true })
  }

  useEffect(() => {
    const fetchData = async () => {
      await getNoodleCount();
      setLoading(false);
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded or there's an error
    }
  }, [fontLoaded, error]); // Run the effect whenever fontsLoaded or error changes

  if (!fontLoaded && !error) {
    return null; // App should wait until fonts are loaded or error occurs
  }


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
      console.log(image)
    }

    try {
      const response = await fetch(image);
      // Check if the fetch was successful
      if (!response.ok) {
        console.error("Failed to fetch image:", response.statusText);
        return null;
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      const blob = await response.blob();
      const storageRef = ref(storage, `images/${timestamp}.gif`);
      const snapshot = await uploadBytes(storageRef, blob);
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
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
        {!loading &&
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 30,
            }}
          >
            <View style={{ alignItems: "center" }}>
              {
                isSmileNoodleSelected && (
                  <Image source={require("../assets/select-circle.png")} style={{ width: 100, height: 100, position: "absolute", marginTop: 60 }}></Image>
                )
              }
              <TouchableOpacity onPress={() => { setSmileNoodleSelected(!isSmileNoodleSelected) }}>
                {
                  noodleCounts.smileNoodle > 0 ? (<Image source={require("../assets/noodle-cup.png")} style={{ width: 100, height: 180 }} />
                  ) : (<Image source={require("../assets/unavailable-noodle-cup.png")} style={{ width: 100, height: 180 }} />
                  )
                }
              </TouchableOpacity>

            </View>
            <View style={{ alignItems: "center" }}>
              {
                isHeartNoodleSelected && (<Image source={require("../assets/select-circle.png")} style={{ width: 100, height: 100, position: "absolute", marginTop: 60 }}></Image>
                )
              }
              <TouchableOpacity onPress={() => { setHeartNoodleSelected(!isHeartNoodleSelected) }}>
                {
                  noodleCounts.heartNoodle > 0 ? (<Image source={require("../assets/noodle-cup-heart.png")} style={{ width: 100, height: 180 }} />
                  ) : (<Image source={require("../assets/unavailable-noodle-cup.png")} style={{ width: 100, height: 180 }} />
                  )
                }
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              {isWinkNoodleSelected && (
                <Image source={require("../assets/select-circle.png")} style={{ width: 100, height: 100, position: "absolute", marginTop: 60 }}></Image>

              )}
              <TouchableOpacity onPress={() => { setWinkNoodleSelected(!isWinkNoodleSelected) }}>

                {
                  noodleCounts.winkNoodle > 0 ? (<Image source={require("../assets/noodle-cup-smile.png")} style={{ width: 100, height: 180 }} />
                  ) : (<Image source={require("../assets/unavailable-noodle-cup.png")} style={{ width: 100, height: 180 }} />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        }
        {/* Noodle Count */}
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "Paytone", fontSize: 16, color: "#880B0B", fontWeight: "light" }}>
            <Text style={{ color: "#C71A1A", }}>{totalNoodle}</Text> cups of noodles left this month
          </Text>
        </View>
      </View>

      {/* Button */}
      <View style={{ zIndex: 0 }}>
        {totalNoodle > 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFA500",
              borderRadius: 25,
              paddingVertical: 12,
              width: width * 0.7,
              alignItems: "center",
              elevation: 5,
            }}
            onPress={() => {
              if (isSmileNoodleSelected) {
                updateNoodleCount("smileNoodle", noodleCounts.smileNoodle - 1);
              }

              if (isHeartNoodleSelected) {
                updateNoodleCount("heartNoodle", noodleCounts.heartNoodle - 1);
              }

              if (isWinkNoodleSelected) {
                updateNoodleCount("winkNoodle", noodleCounts.winkNoodle - 1);
              }
              navigation.navigate("Confirm")
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Paytone", fontSize: 20, fontWeight: "light", color: "#8B0000" }}>Get your noodles</Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <View style={{ width: 50, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                <View style={{ width: 100, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
              </View>
            </View>
          </TouchableOpacity>

        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFA500",
              borderRadius: 25,
              paddingVertical: 12,
              width: width * 0.7,
              alignItems: "center",
              elevation: 5,
            }}

          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Paytone", fontSize: 20, fontWeight: "light", color: "#8B0000" }}>Come back next month</Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <View style={{ width: 50, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
                <View style={{ width: 100, height: 3, backgroundColor: "#FFF", marginHorizontal: 5, borderRadius: 3 }} />
              </View>
            </View>
          </TouchableOpacity>

        )}
      </View>

    </ScrollView>

  );
};

export default InfoScreen;
