import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import FadeInView from "../components/ui/FadeInView";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = (props) => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <>
      <FadeInView style={styles.container}>
        <ExpensesOutput
          expensesPeriod="All Expenses"
          expenses={expensesCtx.expenses}
          fallbackText="No expenses found. Maybe start adding some!"
        />
      </FadeInView>
    </>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
