import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// createBottomTabNavigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// create a function for the nested navigation
function ExpenseOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="All Expenses" component={AllExpenses} />
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {/* ExpensesOverview */}
          <Stack.Screen name="Expenses Overview" component={ExpenseOverview} />
          {/* Manage Expense */}
          <Stack.Screen name="Manage Expense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
