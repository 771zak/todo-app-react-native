import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

//components
import Logo from "../components/Logo.tsx";

// icons
import Icon from "react-native-vector-icons/Entypo";

const SignupScreen = () => {
	const [userName, setUserName] = useState("");

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Logo />
				<Text style={{ fontSize: 20 }}>Wellcome to Todos</Text>
			</View>
			<View style={styles.signUpForm}>
				<Text
					style={{
						fontSize: 18,
						alignSelf: "flex-start",
						marginLeft: 20,
						marginBottom: 10,
					}}
				>
					Create an account
				</Text>

				<TextInput
					placeholder="User Name"
					onChangeText={(text) => setUserName(text)}
					value={userName}
					style={styles.textInput}
				/>
				<View>
					<Icon name="email" />
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
	},
	signUpForm: {
		width: "100%",
		alignItems: "center",
	},
	textInput: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		width: "90%",
		marginBottom: 20,
		elevation: 2,
	},
});

export default SignupScreen;
