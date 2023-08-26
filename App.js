import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { auth } from "./db";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				navigation.replace("Home");
			} else {
				console.log("not Signed");
			}
		});
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
