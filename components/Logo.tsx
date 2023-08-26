import React from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";
import icon from "../assets/icon.png";

const Logo = () => {
	return <Image source={icon} style={styles.logo} />;
};

const styles = StyleSheet.create({
	logo: {
		height: 120,
		width: 125,
	},
});

export default Logo;
