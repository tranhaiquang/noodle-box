import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { db, } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../navigation/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserData } from "../redux/slices/userSlice";
import { getNoodleCount } from "../config/firebase";
import { setNoodleCounts } from "../redux/slices/noodleCountSlice";
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Info'>;
type InfoScreenRouteProp = RouteProp<RootStackParamList, 'Info'>;
type Props = {
  navigation: InfoScreenNavigationProp;
  route: InfoScreenRouteProp;
};

const InfoScreen = ({ navigation, route }: Props) => {
  const [fontLoaded, error] = useFonts({
    "SVN-Nexa Rust Slab Black Shadow": require("../assets/fonts/SVN-Nexa Rust Slab Black Shadow.ttf"),
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    Paytone: require("../assets/fonts/PaytoneOne-Regular.ttf")
  });

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // First Noodle Cup
  const [isSmileNoodleSelected, setSmileNoodleSelected] = useState(false);
  // Second Noodle Cup
  const [isHeartNoodleSelected, setHeartNoodleSelected] = useState(false);
  // Third Noodle Cup
  const [isWinkNoodleSelected, setWinkNoodleSelected] = useState(false)

  const userData = useSelector((state: RootState) => state.userData.userData);

  const noodleCounts = useSelector((state: RootState) => state.noodleCount.noodleCounts);

  const totalNoodle = noodleCounts.heartNoodle + noodleCounts.smileNoodle + noodleCounts.winkNoodle;


  // update noodle count when users click "Get your noodles"
  const updateNoodleCount = async (fieldId: string, count: number) => {
    const docRef = doc(db, "noodle-box", "noodle-count");
    await setDoc(docRef, { [fieldId]: count }, { merge: true })
  }


  const getUserData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const documentSnapshot = await getDoc(docRef)

      if (documentSnapshot.exists()) {
        dispatch(setUserData({
          name: documentSnapshot.data().name,
          birthday: documentSnapshot.data().birthday.toDate().toLocaleDateString(),
          department: documentSnapshot.data().department,
          gender: documentSnapshot.data().gender,
          avatarUrl: documentSnapshot.data().avatarUrl,
        }));
      } else {
        console.log("No such document!");
        return null; // Returning null instead of -1
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return null; // Returning null on error
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = route.params?.uid;
        if (uid) await getUserData(uid);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [route.params?.uid]);

  
  useEffect(() => {
    const fetchData = async () => {
      const noodleData = await getNoodleCount();
      if (noodleData) {
        dispatch(setNoodleCounts(noodleData));
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded or there's an error
    }
  }, [fontLoaded, error]); // Run the effect whenever fontsLoaded or error changes

  if (!fontLoaded && !error) {
    return null; // App should wait until fonts are loaded or error occurs
  }

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
          <Image style={{ height: 80, width: 80 }} source={{ uri: userData.avatarUrl }} />
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
            {[userData.name, userData.birthday, userData.gender, userData.department].map((value, idx) => (
              <Text key={idx} style={{ fontFamily: "Nunito", color: "#880B0B", textTransform: "capitalize" }}>
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
