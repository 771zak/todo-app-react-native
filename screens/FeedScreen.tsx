import React from "react";
import {
	Text,
	View,
	StyleSheet,
} from "react-native";

const FeedScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Feed Screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
})

export default FeedScreen;
