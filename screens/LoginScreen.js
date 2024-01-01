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

// icons
import Icon from "react-native-vector-icons/FontAwesome";

// firebase
import { auth } from "../db";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// components
import Logo from "../components/Logo.tsx";
import InputField from "../components/InputField";
import colors from "../Colors";

import { useAuth } from "../AuthContext";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(true);

	const [_, setUser] = useAuth();

	const signIn = () => {

		signInWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				console.log("LOGGED IN");
				setUser(userCred.user)
			})
			.catch((error) => {
				console.log(error.message);
			});
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
