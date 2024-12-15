import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
    console.log("HomeScreen loaded"); // Check if this screen is being rendered

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Info')}
            >
                <Text style={styles.buttonText}>Go to Info Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Welcome')}
            >
                <Text style={styles.buttonText}>Go to Welcome Screen</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default HomeScreen;