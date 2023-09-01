import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(undefined);

  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError(error.message);
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay error={error} onPress={() => setError(undefined)} />;
  }
  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Recent Expenses"
        fallbackText="No recent expenses found. Maybe start adding some!"
      />
    </>
  );
};

export default RecentExpenses;
