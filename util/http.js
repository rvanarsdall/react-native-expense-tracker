import axios from "axios";
const url = "https://defmover-19781.firebaseiocom/";

export async function storeExpense(expenseData) {
  const response = await axios.post(url + "expenses.json", expenseData);
  console.log(response.data);
  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(url + "expenses.json");
  const expenses = [];
  console.log(response.data);
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
}

export const updateExpense = async (id, expenseData) => {
  return await axios.put(url + `expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return await axios.delete(url + `expenses/${id}.json`);
};
