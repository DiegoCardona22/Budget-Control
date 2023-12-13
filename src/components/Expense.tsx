// @packages
import { Dispatch, SetStateAction } from "react";
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// @scripts
import ExpensesIcon from "../img/spent-icon.svg";
import FoodIcon from "../img/food-icon.svg";
import HealthIcon from "../img/health-icon.svg";
import HomeIcon from "../img/home-icon.svg";
import LeisureIcon from "../img/leisure-icon.svg";
import SavingIcon from "../img/saving-icon.svg";
import SubscriptionIcon from "../img/subscription-icon.svg";
import { IExpenseForm } from "../App";
import { formatDate } from "../helpers";

// @interfaces
interface IExpenseProps {
  expense: IExpenseForm;
  handleDeleteExpense: (id: string) => void;
  setExpenseToEdit: Dispatch<SetStateAction<IExpenseForm>>;
}

const icons: { [key: string]: string } = {
  expenses: ExpensesIcon,
  food: FoodIcon,
  health: HealthIcon,
  home: HomeIcon,
  leisure: LeisureIcon,
  saving: SavingIcon,
  subscription: SubscriptionIcon,
};

const Expense = ({
  expense,
  setExpenseToEdit,
  handleDeleteExpense,
}: IExpenseProps) => {
  const { id, amount, category, expense: actualExpense, date } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseToEdit(expense)}>Edit</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => handleDeleteExpense(id!)} destructive={true}>
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="expense shadow">
          <div className="expense-content">
            <img alt="Expense" src={icons[category!]} />
            <div className="expense-description">
              <p className="category">{category}</p>

              <p className="expense-name">{actualExpense}</p>

              <p className="expense-date">
                Added on: <span>{formatDate(date!)}</span>
              </p>
            </div>
          </div>
          <p className="expense-amount">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
