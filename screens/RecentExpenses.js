import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";

const RecentExpenses = (props) => {
  return (
    <>
      <View>
        <ExpensesOutput expensesPeriod="Recent Expenses" />
      </View>
    </>
  );
};

export default RecentExpenses;
