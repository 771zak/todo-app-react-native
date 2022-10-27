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
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//animation
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withSpring,
} from "react-native-reanimated";

import Icon from "react-native-vector-icons/FontAwesome";
import EIcon from "react-native-vector-icons/Entypo";

//import components
import Menu from "../components/Menu";

// firebase
import { auth, db } from "../db";
import { onAuthStateChanged } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const progress = useSharedValue(0);

	const reanimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: progress.value,
		};
	});

	//get the user name
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user.uid);
			} else {
				navigation.replace("Login");
			}
		});
	}, []);

	const showSearchBar = () => {
		setShowSearch(!showSearch);
		if (!showSearch) {
			progress.value = withTiming(1, { duration: 300 });
		} else {
			progress.value = 0;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.logo}>Todos</Text>
				<View style={styles.headerBtnContainer}>
					<TouchableOpacity onPress={showSearchBar}>
						<Icon name="search" size={24} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
						<EIcon name="menu" size={35} />
					</TouchableOpacity>
				</View>
			</View>
			<Menu display={showMenu} navigation={navigation} />
			<Animated.View
				style={[
					showSearch ? styles.searchContainer : { display: "none" },
					reanimatedStyle,
				]}
			>
				<TextInput placeholder="Search..." style={{ fontSize: 18 }} />
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight,
	},
	header: {
		width: "100%",
		height: 50,
		backgroundColor: "#fff",
		elevation: 2,
		alignSelf: "flex-start",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	logo: {
		fontSize: 25,
		marginLeft: 15,
		fontWeight: "bold",
	},
	headerBtnContainer: {
		width: "30%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	searchContainer: {
		backgroundColor: "white",
		margin: 10,
		padding: 10,
		borderRadius: 10,
		elevation: 2,
	},
});

export default HomeScreen;
