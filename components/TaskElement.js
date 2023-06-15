import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const TaskElement = ({ item }) => {
	let boolVal = item.status + "";
	const changeTaskStatus = () => {
		// item.status = !item.status;
		console.log(!item.status);
	};
	return (
		<TouchableOpacity style={styles.taskItem} onPress={changeTaskStatus}>
			<Text style={item.status == true ? styles.doneTask : styles.undoneTask}>
				{item.task}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	taskItem: {
		backgroundColor: "pink",
		margin: 10,
		padding: 10,
		elevation: 1,
		borderRadius: 10,
	},
	doneTask: {
		textDecorationLine: "line-through",
	},
	undoneTask: {
		textDicorationLine: "none",
	},
});

export default TaskElement;
