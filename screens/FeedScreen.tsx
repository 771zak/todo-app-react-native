import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	StatusBar
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const FeedScreen = () => {
	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.header}>
				<TouchableOpacity>
					<Icon name="bars" size={18}/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		backgroundColor: "blue",
		width: "100%",
		height: "5%",
		position: "absolute",
		top: 0,
		justifyContent: "center",
	}
})

export default FeedScreen;
