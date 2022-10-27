import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SignupScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
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
		height: 20,
		backgroundColor: "red",
	},
});

export default SignupScreen;
