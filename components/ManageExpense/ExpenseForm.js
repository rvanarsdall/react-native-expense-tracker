import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = (props) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: props.defaultValues?.amount?.toString() ?? "",
      isValid: true,
    },
    date: {
      value: props.defaultValues?.date?.toISOString().split("T")[0] ?? "",
      isValid: true,
    },

    description: {
      value: props.defaultValues?.description ?? "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, inputValue) {
    setInputValues((prevInputValues) => {
      return {
        ...prevInputValues,
        [inputIdentifier]: { value: inputValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = !isNaN(expenseData.date.getTime());
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((prevInputValues) => {
        return {
          amount: {
            ...prevInputValues.amount,
            isValid: amountIsValid,
          },
          date: {
            ...prevInputValues.date,
            isValid: dateIsValid,
          },
          description: {
            ...prevInputValues.description,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }

    if (props.isEditing) {
      props.onSubmitUpdate(expenseData);
    } else {
      props.onSubmitAdd(expenseData);
    }
  }

  const formIsInvalid = Object.values(inputValues).some(
    (input) => !input.isValid
  );

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense </Text>
        <View style={styles.inputsRow}>
          <Input
            style={{ flex: 1 }}
            label="Amount"
            invalid={!inputValues.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputValues.amount.value,
            }}
          />
          <Input
            style={{ flex: 1 }}
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputValues.date.value,
            }}
            invalid={!inputValues.date.isValid}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "description"),
            multiline: true,
            value: inputValues.description.value,
          }}
          invalid={!inputValues.description.isValid}
        />
        {formIsInvalid && (
          <Text style={styles.errorText}>Please enter valid data</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button mode="flat" onPress={props.onCancel}>
            Cancel
          </Button>
          {props.isEditing ? (
            <Button onPress={submitHandler} style={styles.button}>
              Update
            </Button>
          ) : (
            <Button onPress={submitHandler} style={styles.button}>
              Add
            </Button>
          )}
        </View>
      </View>
    </>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    color: "white",
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginVertical: 10,
  },
});
