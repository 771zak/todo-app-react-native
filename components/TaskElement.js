import { Text, View, StyleSheet } from "react-native";

const TaskElement = ({ item }) => {
  let boolVal = item.status+"";
	return (
		<View style={styles.taskItem}>
			<Text style={item.status == true ? styles.doneTask : styles.undoneTask}>{item.task}</Text>
		</View>
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
    textDecorationLine: "line-through"
  },
  undoneTask: {
    textDicorationLine: "none",
  }
});

export default TaskElement;
