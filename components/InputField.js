import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const InputField = (props) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholder={props.name}
				onChangeText={(text) => props.changeInput(text)}
				style={styles.textInput}
				secureTextEntry={props.password}
			/>
			<Icon name={props.icon} size={18} />
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 2,
	},
	textInput: {
		backgroundColor: "white",
		padding: 15,
		width: "85%",
		elevation: 0,
		fontSize: 18,
	},
});

export default InputField;
