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
import {createDrawerNavigator} from "@react-navigation/drawer"

const Drawer = createDrawerNavigator();

//animation
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withSpring,
} from "react-native-reanimated";

// icons
import Icon from "react-native-vector-icons/FontAwesome";
import EIcon from "react-native-vector-icons/Entypo";

//import screens
import FeedScreen from "./FeedScreen.tsx"

// import components
import CustomDrawer from "../components/CustomDrawer.tsx"
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

const HomeScreen = ({ navigation }) => {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("user ==> ", user);
				setUid(user.uid);
				setUser(user)
				getTasks();
				console.log("tasks ==> ", tasks);
			} else {
				navigation.replace("Login");
			}
		});
	}, []);
	const [tasks, setTasks] = useState([]);
	const [uid, setUid] = useState("");
	const [user, setUser] = useState({})

	//get taks from db
	const getTasks = async () => {
		const q = query(collection(db, "tasks"), where("userId", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
			setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
		return unsubscribe;
	};

	return (
		<Drawer.Navigator drawerContent={props => <CustomDrawer {...props} userInfo={user.displayName}/>} 
		screenOptions={{
			headerShown: true,
			drawerLabelStyle: {
				marginLeft: -25,
				fontSize:15,
			}
		}} >
			<Drawer.Screen name="Feed" component={FeedScreen}
				options={{
					drawerIcon: ({color}) => (
						<Icon name="home" size={22} color={color}/>
					)
				}}
			/>
			<Drawer.Screen name="Settings" component={SettingScreen}
				options={{
					drawerIcon: ({color}) => (
						<Icon name="gear" size={22} color={color}/>
					)
				}}
			/>
		</Drawer.Navigator>
	);
};

export default HomeScreen;
