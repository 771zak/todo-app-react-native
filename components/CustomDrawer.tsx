import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"

import colors from "../Colors";
import EIcon from "react-native-vector-icons/Entypo";

import { signOut } from "firebase/auth";
import { auth } from "../db";

const CustomDrawer = (props) => {
	
	const logOut = () => {
		signOut(auth).then(() => {
			console.log("signed out")
		}).catch((err) => {
			console.log(err)
		})
	}
	return (
		<View style={{flex: 1}}>
			<DrawerContentScrollView {...props}>
				<View style={styles.MenuHeader}>
					<Image style={styles.MenuHeaderImage} source={require("../assets/pfp.jpg")} />
					<View style={styles.MenuHeaderInfo}>
						<Text style={{ fontSize: 20 }}>Todos</Text>
						<Text style={{ fontSize: 24, marginLeft: 5, fontWeight: 700 }}>{props.userInfo}</Text>
					</View>
				</View>
				<DrawerItemList {...props}/>
			</DrawerContentScrollView>
			<View style={styles.MenuFooter}>
				<TouchableOpacity style={styles.SignOutBtn}
					onPress={logOut}
				>
					<EIcon name="log-out" size={16}/>
					<Text style={{ fontSize: 16, fontWeight: 500 }} >Sign Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	MenuHeader: {
		width: "100%",
		height: 120,
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	MenuHeaderImage: {
		width: 80, 
		height: 80,
		borderRadius:50,
		borderColor: colors.primary,
		borderWidth: 2,
		marginLeft: 10,
		elevation: 2,
	},
	MenuHeaderInfo: {
		marginLeft: 10,
		paddingBottom: 20,
		width: "50%",
		borderBottomColor: colors.accent,
		borderBottomWidth: 4
	},
	MenuFooter: {
		height: "30%",
		width: "100%",
		position: "absolute",
		bottom: 60,
		left: 0,
		flex: 1,
		alignItems: "center"
	},
	SignOutBtn: {
		backgroundColor: colors.primary,
		width: "40%",
		padding: 13,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderRadius: 15,
		elevation: 4,
	}
})

export default CustomDrawer;
