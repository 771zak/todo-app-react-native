import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Platform,
	TouchableOpacity,
	TextInput,
	ScrollView,
	FlatList,
	Settings,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// firebase
import { auth, db } from "../db";
import { onAuthStateChanged } from "firebase/auth";
import {
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	collection,
	addDoc,
	query,
	where,
} from "firebase/firestore";
import SettingScreen from "./SettingScreen.tsx";

import {useAuth} from "../AuthContext";

const HomeScreen = ({ navigation }) => {
	const [user] = useAuth();

	return (
		<View style={styles.homeContainer}>
			<Text style={{color: "white"}}>
				{user.displayName}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		padding: 24,
		backgroundColor: "#333",
	}
})

export default HomeScreen;
