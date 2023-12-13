// @scripts
import ControlBudget from "./ControlBudget";
import NewBudget from "./NewBudget";
import { IExpenseForm } from "../App";

// @interfaces
interface IHeaderProps {
  budget: number;
  expenses: IExpenseForm[];
  isValidBudget: boolean;
  setBudget: (budget: number) => void;
  setExpenses: (expenses: IExpenseForm[]) => void;
  setIsValidBudget: (isValidBudget: boolean) => void;
}

const Header = ({
  budget,
  expenses,
  isValidBudget,
  setBudget,
  setExpenses,
  setIsValidBudget,
}: IHeaderProps) => (
  <header>
    <h1>Expense Planner</h1>

    {!isValidBudget ? (
      <NewBudget
        budget={budget}
        setBudget={setBudget}
        setIsValidBudget={setIsValidBudget}
      />
    ) : (
      <ControlBudget
        budget={budget}
        expenses={expenses}
        setBudget={setBudget}
        setExpenses={setExpenses}
        setIsValidBudget={setIsValidBudget}
      />
    )}
  </header>
);

export default Header;
