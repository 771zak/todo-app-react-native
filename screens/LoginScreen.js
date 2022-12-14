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

	return (
		<KeyboardAvoidingView
			behavior={Platform.os == "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<View style={styles.main}>
				<Text style={styles.logo}>Todos</Text>
				<Text style={{ fontSize: 23, marginBottom: 20 }}>
					Wellcome back you've been missed!
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Enter your Email"
						style={styles.email}
						onChangeText={(text) => setEmail(text)}
						value={email}
						KeyboardType="email-address"
					/>
					<View style={styles.passwordContainer}>
						<TextInput
							placeholder="Enter your password"
							style={styles.password}
							onChangeText={(text) => setPassword(text)}
							value={password}
							secureTextEntry={showPass}
						/>
						<TouchableOpacity onPress={() => setShowPass(!showPass)}>
							<Icon
								name={showPass ? "eye" : "eye-slash"}
								color="black"
								size={18}
								style={{ marginLeft: 10 }}
								backgroundColor="transparent"
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.signBtn} onPress={signIn}>
						<Text style={{ fontSize: 18, color: "white" }}>Sign In</Text>
					</TouchableOpacity>
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
	logo: {
		fontSize: 40,
	},
	inputContainer: {
		width: "100%",
		height: "30%",
		alignItems: "center",
	},
	passwordContainer: {
		width: "90%",
		backgroundColor: "white",
		alignItems: "center",
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 20,
	},
	email: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		width: "90%",
		marginBottom: 20,
	},
	password: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		width: "85%",
	},
	signBtn: {
		backgroundColor: "#E1372D",
		borderRadius: 10,
		width: "50%",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoginScreen;
