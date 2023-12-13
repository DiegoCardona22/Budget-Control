// @packages
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState, useEffect } from "react";

// @scripts
import { IExpenseForm } from "../App";

// @interfaces
interface IControlBudgetProps {
  budget: number;
  expenses: IExpenseForm[];
  setExpenses: (expenses: IExpenseForm[]) => void;
  setBudget: (budget: number) => void;
  setIsValidBudget: (isValidBudget: boolean) => void;
}

const ControlBudget = ({
  budget,
  expenses,
  setExpenses,
  setBudget,
  setIsValidBudget,
}: IControlBudgetProps) => {
  const [available, setAvailable] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => total + expense.amount!, 0);
    const percentage = ((totalSpent / budget) * 100).toFixed(2) || 0;
    const totalAvailable = budget - totalSpent;

    setAvailable(totalAvailable);

    setTimeout(() => {
      setPercentage(Number(percentage));
    }, 500);

    setSpent(totalSpent);
  }, [budget, expenses]);

  const formatBudget = (budget: number) => {
    return budget.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  };

  const handleResetApp = () => {
    setAvailable(0);
    setBudget(0);
    setIsValidBudget(false);
    setPercentage(0);
    setSpent(0);
    setExpenses([]);

    localStorage.removeItem("budget");
    localStorage.removeItem("expenses");
  };

  return (
    <div className="budget-container container shadow">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#ef4444" : "#3b82f6",
            trailColor: "#d1d5db",
            textColor: percentage > 100 ? "#ef4444" : "#3b82f6",
          })}
          strokeWidth={10}
          text={`${percentage}% Spent`}
          value={percentage}
        />
      </div>

      <div className="content-budget">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Budget: </span> {formatBudget(budget)}
        </p>

        <p className={available < 0 ? "negative" : ""}>
          <span>Available: </span> {formatBudget(available)}
        </p>

        <p>
          <span>Spent: </span> {formatBudget(spent)}
        </p>
      </div>
    </div>
  );
};

export default ControlBudget;
