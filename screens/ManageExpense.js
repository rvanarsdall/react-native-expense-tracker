import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpense = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(undefined);
  const editedExpenseId = props.route.params?.expenseId;
  // Convert a truthy value to a boolean
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [props.navigation, isEditing]);

  async function deleteHandlerFunction() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      props.navigation.navigate("AllExpenses");
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
    // props.navigation.goBack();
  }

  function cancelHandlerFunction() {
    props.navigation.goBack();
  }

  async function updateHandlerFunction(expenseData) {
    setIsSubmitting(true);
    try {
      await updateExpense(editedExpenseId, expenseData);
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      props.navigation.navigate("AllExpenses");
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  }

  async function addHandlerFunction(expenseData) {
    setIsSubmitting(true);
    try {
      const response = await storeExpense(expenseData);
      expenseCtx.addExpense(response);
      props.navigation.navigate("AllExpenses");
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay error={error} onPress={() => setError(undefined)} />;
  }
  return (
    <>
      <View style={styles.container}>
        <ExpenseForm
          onCancel={cancelHandlerFunction}
          isEditing={isEditing}
          onSubmitAdd={addHandlerFunction}
          onSubmitUpdate={updateHandlerFunction}
          defaultValues={selectedExpense}
        />

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
