import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Toilet Paper",
    amount: 94.12,
    date: new Date(2023, 8, 25),
  },
  {
    id: "e2",
    description: "New TV",
    amount: 799.49,
    date: new Date(2022, 8, 24),
  },
  {
    id: "e3",
    description: "Car Insurance",
    amount: 294.67,
    date: new Date(2023, 8, 21),
  },
  {
    id: "e4",
    description: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2023, 8, 19),
  },
];

const ExpensesOutput = (props) => {
  let { expenses, expensesPeriod } = props;

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{props.fallbackText}</Text>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
