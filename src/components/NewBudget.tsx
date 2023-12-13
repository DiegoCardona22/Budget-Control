// @packages
import { useState } from "react";

// @scripts
import Message from "./Message";

// @interfaces
interface INewBudgetProps {
  budget: number;
  setBudget: (budget: number) => void;
  setIsValidBudget: (isValidBudget: boolean) => void;
}

const NewBudget = ({
  budget,
  setBudget,
  setIsValidBudget,
}: INewBudgetProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmitBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setMessage("The budget must be greater than zero");
      return;
    }

    setMessage("");
    setIsValidBudget(true);
  };

  return (
    <div className="budget-container container shadow">
      <form className="form" onSubmit={handleSubmitBudget}>
        <div className="field">
          <label htmlFor="budget">Budget</label>
          <input
            className="new-budget"
            type="text"
            placeholder="Define Your Budget"
            name="budget"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />

          <input type="submit" value="Define Your Budget" />

          {message && <Message type="error">{message}</Message>}
        </div>
      </form>
    </div>
  );
};

export default NewBudget;
