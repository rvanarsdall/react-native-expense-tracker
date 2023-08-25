import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";

const AllExpenses = (props) => {
  return (
    <>
      <ExpensesOutput expensesPeriod="All Expenses" />
    </>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
