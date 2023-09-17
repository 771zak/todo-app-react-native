import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

// firebase
import { auth, db } from "../db.js";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

//components
import Logo from "../components/Logo.tsx";
import InputField from "../components/InputField.js";
import colors from "../Colors.js";

// icons
import Icon from "react-native-vector-icons/Ionicons";

const SignupScreen = ({ navigation }) => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				const userUid = userCred.user.uid;
				updateProfile(auth.currentUser, {
					displayName: userName,
				}).then(() => {
					navigation.navigate("Home");
				})
				// setDoc(doc(db, "users", userUid), {
				// 	userName: userName,
				// 	email: email,
				// });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	let switchToSignIn = () => {
		navigation.navigate("Login");
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Logo />
				<Text style={{ fontSize: 20, marginTop: 10 }}>Create an account</Text>
			</View>
			<View style={styles.signUpForm}>
				<View style={styles.inputContainer}>
					<InputField
						name="User name"
						changeInput={(input) => setUserName(input)}
						icon="person-outline"
					/>
					<InputField
						name="Email"
						changeInput={(input) => setEmail(input)}
						icon="mail-outline"
					/>
					<InputField
						name="Password"
						changeInput={(input) => setPassword(input)}
						icon="lock-closed-outline"
						password={true}
					/>
					<TouchableOpacity onPress={signUp} style={styles.singUpButton}>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>REGISTER</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.logScreenRoute}>
					<Text style={{ fontSize: 16 }}>Already have an account? </Text>
					<TouchableOpacity onPress={switchToSignIn}>
						<Text style={{ fontSize: 16, color: colors.accent }}>Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		width: "100%",
		alignItems: "center",
		padding: 10,
	},
	signUpForm: {
		width: "100%",
		alignItems: "center",
		marginTop: 20,
	},
	textInput: {
		backgroundColor: "white",
		padding: 10,
		width: "85%",
		elevation: 0,
		fontSize: 18,
	},
	inputContainer: {
		width: "90%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	singUpButton: {
		width: "90%",
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	logScreenRoute: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "baseline",
		marginTop: 20,
	},
});

export default SignupScreen;
