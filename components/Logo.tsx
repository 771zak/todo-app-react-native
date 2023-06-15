import React from "react-native";
import { Text, View, StyleSheet } from "react-native";

const Logo = () => {
	return <Text style={styles.logo}>Todos</Text>;
};

const styles = StyleSheet.create({
	logo: {
		fontSize: 40,
	},
});

export default Logo;
