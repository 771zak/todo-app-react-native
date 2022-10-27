import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
	LightSpeedInLeft,
	LightSpeedInRight,
	BounceOutRight,
} from "react-native-reanimated";

//firebase
import { auth } from "../db";
import { signOut } from "firebase/auth";

//icons
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = (props) => {
	const signOutUser = () => {
		signOut(auth)
			.then(() => {
				props.navigation.replace("Login");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<Animated.View
			entering={LightSpeedInRight}
			exiting={BounceOutRight}
			style={props.display ? styles.container : { display: "none" }}
		>
			<Text>Menu is here</Text>
			<TouchableOpacity style={styles.signOut} onPress={signOutUser}>
				<Text style={{ color: "white", fontSize: 16 }}>Sign Out</Text>
				<Icon name="sign-out" size={18} color="white" />
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "50%",
		height: "90%",
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: "white",
		alignSelf: "flex-end",
		elevation: 3,
		alignItems: "center",
	},
	signOut: {
		width: "90%",
		backgroundColor: "#E1372D",
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderRadius: 10,
	},
});

export default Menu;
