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
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

//import components
import Menu from "../components/Menu";
import TaskElement from "../components/TaskElement";

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

const HomeScreen = ({ navigation }) => {
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [uid, setUid] = useState("");
	const [userName, setName] = useState("");

	const progress = useSharedValue(0);

	const reanimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: progress.value,
		};
	});

	//get taks from db
	const getTasks = async () => {
		const q = query(collection(db, "tasks"), where("userId", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
			setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});

		// let todos = [];
		// unsubscribe.forEach((doc) => {
		// 	console.log(doc.id, " => ", doc.data());
		// 	const { task, status, time, userId } = doc.data();
		// 	todos.push({
		// 		id: doc.id,
		// 		task,
		// 		time,
		// 		status,
		// 		userId,
		// 	});
		// });
		//
		// setTasks(todos);

		return unsubscribe;
	};

	//get the user name
	const getUserName = async () => {
		const docRef = doc(db, "users", uid);

		const docSnap = await getDoc(docRef);
		setName(docSnap.data().userName);
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user.uid);
				setUid(user.uid);
				getUserName();
				getTasks();
				console.log(tasks);
			} else {
				navigation.replace("Login");
			}
		});
	}, [uid]);

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
			<Menu display={showMenu} navigation={navigation} name={userName} />
			<Animated.View
				style={[
					showSearch ? styles.searchContainer : { display: "none" },
					reanimatedStyle,
				]}
			>
				<TextInput placeholder="Search..." style={{ fontSize: 18 }} />
			</Animated.View>

			<View style={styles.todoListContainer}>
				<FlatList
					style={{ elevation: 0, position: "absolute", width: "100%"}}
					data={tasks}
					renderItem={TaskElement}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<TouchableOpacity style={styles.addBtn}>
				<Text style={{ fontSize: 28 }}>+</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight,
		height: "100%",
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
		top: 80,
		width: "95%",
		position: "absolute",
		elevation: 3,
		zIndex: 2,
	},
	taskList: {
		backgroundColor: "pink",
		width: "100%",
		marginTop: 30,
	},
	addBtn: {
		backgroundColor: "#E1372D",
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: 20,
		bottom: 20,
		elevation: 3,
	},
	todoListContainer: {
		position: "relative",
		height: "80%",
	}
});

export default HomeScreen;
