// @packages
import { useState, useEffect } from "react";

// @scripts
import ExpenseIcon from "./img/new-expense.svg";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import Header from "./components/Header";
import NewExpenseModal from "./components/NewExpenseModal";
import { generateId } from "./helpers";

// @interfaces
export interface IExpenseForm {
  amount?: number | null;
  category?: string;
  date?: Date;
  expense?: string;
  id?: string;
}

// @constants
export const initialExpenseForm: IExpenseForm = {
  amount: null,
  category: "",
  expense: "",
};

const App = () => {
  const [budget, setBudget] = useState(localStorage.getItem("budget") ? Number(localStorage.getItem("budget")) : 0);
  const [expenseToEdit, setExpenseToEdit] = useState<IExpenseForm>({});
  const [expenses, setExpenses] = useState<IExpenseForm[]>(localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")!) : []);
  const [filter, setFilter] = useState<string>("");
  const [filteredExpenses, setFilteredExpenses] = useState<IExpenseForm[]>([]);
  const [isValidBudget, setIsValidBudget] = useState<boolean>(false);
  const [modalExpenseAnimation, setModalExpenseAnimation] = useState<boolean>(false);
  const [showNewExpense, setShowNewExpense] = useState<boolean>(false);

  const handleNewExpense = (isEdit = false) => {
    setShowNewExpense(true);

    if (!isEdit) {
      setExpenseToEdit({});
    }

    setTimeout(() => {
      setModalExpenseAnimation(true);
    }, 500);
  };

  const handleSaveExpense = (expense: IExpenseForm) => {
    if (expense.id) {
      const updateExpenses = expenses.map((expenseItem) => {
        if (expenseItem.id === expense.id) {
          return expense;
        }

        return expenseItem;
      });

      setExpenses(updateExpenses);
    } else {
      expense.id = generateId();
      expense.date = new Date();

      setExpenses([...expenses, expense]);
    }

    setModalExpenseAnimation(false);

    setTimeout(() => {
      setShowNewExpense(false);
    }, 500);
  };

  const handleDeleteExpense = (id: string) => {
    const updateExpenses = expenses.filter((expense) => expense.id !== id);

    setExpenses(updateExpenses);
  };

  useEffect(() => {
    if (Object.keys(expenseToEdit).length > 0) {
      handleNewExpense(true);
    }
  }, [expenseToEdit]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    const budgetLS = localStorage.getItem("budget");

    if (budgetLS && Number(budgetLS) > 0) {
      setBudget(Number(budgetLS));
      setIsValidBudget(true);
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === filter
      );

      setFilteredExpenses(filteredExpenses);
    }
  }, [filter]);

  return (
    <div className={showNewExpense ? "fixed" : ""}>
      <Header
        budget={budget}
        expenses={expenses}
        isValidBudget={isValidBudget}
        setBudget={setBudget}
        setExpenses={setExpenses}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ExpenseList
              expenses={expenses}
              filter={filter}
              filteredExpenses={filteredExpenses}
              handleDeleteExpense={handleDeleteExpense}
              setExpenseToEdit={setExpenseToEdit}
            />
          </main>
          <div className="new-expense">
            <img
              alt="New Expense"
              onClick={() => handleNewExpense(false)}
              src={ExpenseIcon}
            />
          </div>
        </>
      )}

      {showNewExpense && (
        <NewExpenseModal
          expenseToEdit={expenseToEdit}
          handleSaveExpense={handleSaveExpense}
          modalExpenseAnimation={modalExpenseAnimation}
          setExpenseToEdit={setExpenseToEdit}
          setModalExpenseAnimation={setModalExpenseAnimation}
          setShowNewExpense={setShowNewExpense}
        />
      )}
    </div>
  );
};

export default App;
