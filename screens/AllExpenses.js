import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import FadeInView from "../components/ui/FadeInView";

const AllExpenses = (props) => {
  return (
    <>
      <FadeInView style={styles.container}>
        <ExpensesOutput expensesPeriod="All Expenses" />
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
