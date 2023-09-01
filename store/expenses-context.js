import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../components/Expenses/ExpensesOutput";
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET_EXPENSES":
      return action.payload.reverse();
    case "ADD_EXPENSE":
      // const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload.id);

    case "UPDATE_EXPENSE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
}

function ExpensesContextProvider(props) {
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  function addExpenseHandler(expenseData) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseData,
    });
  }

  function deleteExpenseHandler(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: { id },
    });
  }

  function updateExpenseHandler(id, expenseData) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: {
        id,
        data: expenseData,
      },
    });
  }

  function setExpensesHandler(expenses) {
    dispatch({
      type: "SET_EXPENSES",
      payload: expenses,
    });
  }
  const value = {
    expenses: expenseState,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
    setExpenses: setExpensesHandler,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {props.children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
