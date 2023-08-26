import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from "../db";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// components
import Logo from "../components/Logo.tsx";
import InputField from "../components/InputField";
import colors from "../Colors";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.replace("Home");
			} else {
				console.log("not Signed");
			}
		});
	}, []);

	const signIn = () => {
		console.log("btn clicked");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				navigation.navigate("Home");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const switchToSignUp = () => {
		navigation.navigate("Signup");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.os == "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<View style={styles.main}>
				<Logo />
				<Text style={{ fontSize: 20, marginBottom: 20 }}>
					Wellcome back you've been missed!
				</Text>
				<View style={styles.inputContainer}>
					<InputField
						name="Email"
						changeInput={(input) => setEmail(input)}
						icon="mail-outline"
					/>
					<InputField
						name="Password"
						icon="lock-closed-outline"
						changeInput={(input) => setPassword(input)}
						password={true}
					/>
					<TouchableOpacity style={styles.signBtn} onPress={signIn}>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>LOGIN</Text>
					</TouchableOpacity>
					<View style={styles.logScreenRoute}>
						<Text style={{ fontSize: 16 }}>Don't have an accout?</Text>
						<TouchableOpacity
							style={{ marginLeft: 5 }}
							onPress={switchToSignUp}
						>
							<Text style={{ fontSize: 16, color: colors.accent }}>
								Register
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		width: "90%",
		height: "30%",
		alignItems: "center",
	},
	signBtn: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		width: "90%",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		elevation: 2,
	},
	logScreenRoute: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "baseline",
		marginTop: 20,
	},
});

export default LoginScreen;
