import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";

const ManageExpense = (props) => {
  const editedExpenseId = props.route.params?.expenseId;
  // Convert a truthy value to a boolean
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [props.navigation, isEditing]);

  function deleteHandlerFunction() {
    props.navigation.navigate("AllExpenses");
  }

  function cancelHandlerFunction() {
    props.navigation.goBack();
  }

  function updateHandlerFunction() {
    props.navigation.navigate("AllExpenses");
  }

  function addHandlerFunction() {
    props.navigation.navigate("AllExpenses");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button mode="flat" onPress={cancelHandlerFunction}>
            Cancel
          </Button>
          {isEditing ? (
            <Button onPress={updateHandlerFunction} style={styles.button}>
              Update
            </Button>
          ) : (
            <Button onPress={updateHandlerFunction} style={styles.button}>
              Add
            </Button>
          )}
        </View>
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              color={GlobalStyles.colors.error500}
              icon="trash"
              size={36}
              onPress={deleteHandlerFunction}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
