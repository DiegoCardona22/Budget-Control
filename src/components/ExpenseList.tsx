// @packages
import { Dispatch, SetStateAction } from "react";

// @scripts
import Expense from "./Expense";
import { IExpenseForm } from "../App";

// @interfaces
interface IExpenseListProps {
  expenses: IExpenseForm[];
  filter: string;
  filteredExpenses: IExpenseForm[];
  handleDeleteExpense: (id: string) => void;
  setExpenseToEdit: Dispatch<SetStateAction<IExpenseForm>>;
}

const ExpenseList = ({
  expenses,
  filter,
  filteredExpenses,
  handleDeleteExpense,
  setExpenseToEdit,
}: IExpenseListProps) => (
  <div className="expense-list container">
    {filter ? (
      <>
        <h2>
          {filteredExpenses.length > 0 ? "Filtered Expenses" : "No Expenses"}
        </h2>
        {filteredExpenses.map((expense) => (
          <Expense
            expense={expense}
            handleDeleteExpense={handleDeleteExpense}
            key={expense.id}
            setExpenseToEdit={setExpenseToEdit}
          />
        ))}
      </>
    ) : (
      <>
        <h2>{expenses.length > 0 ? "Expense List" : "No Expenses"}</h2>
        {expenses.map((expense) => (
          <Expense
            expense={expense}
            handleDeleteExpense={handleDeleteExpense}
            key={expense.id}
            setExpenseToEdit={setExpenseToEdit}
          />
        ))}
      </>
    )}
  </div>
);

export default ExpenseList;
