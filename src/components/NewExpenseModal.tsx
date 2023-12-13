// @packages
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

// @scripts
import CloseIcon from "../img/close-icon.svg";
import Message from "./Message";
import { IExpenseForm, initialExpenseForm } from "../App";

// @interfaces
interface INewExpenseProps {
  expenseToEdit: IExpenseForm;
  handleSaveExpense: (expense: IExpenseForm) => void;
  modalExpenseAnimation: boolean;
  setExpenseToEdit: (expense: IExpenseForm) => void;
  setModalExpenseAnimation: (modalExpenseAnimation: boolean) => void;
  setShowNewExpense: (showNewExpense: boolean) => void;
}

const NewExpenseModal = ({
  expenseToEdit,
  handleSaveExpense,
  modalExpenseAnimation,
  setExpenseToEdit,
  setModalExpenseAnimation,
  setShowNewExpense,
}: INewExpenseProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [expenseForm, setExpenseForm] = useState<IExpenseForm>(initialExpenseForm);
  const [id, setId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCloseExpenseModal = () => {
    setModalExpenseAnimation(false);
    setExpenseToEdit({});

    setTimeout(() => {
      setShowNewExpense(false);
    }, 500);
  };

  const handleChangeExpenseForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "amount") {
      setExpenseForm({
        ...expenseForm,
        [e.target.name]: Number(e.target.value),
      });

      return;
    }

    setExpenseForm({
      ...expenseForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitExpenseForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isSubmitted = false;

    Object.values(expenseForm).forEach((value) => {
      if (!value) {
        setMessage("All fields are required");
        isSubmitted = true;
        return;
      }
    });

    if (isSubmitted) return;
    handleSaveExpense({
      ...expenseForm,
      id,
      date,
    });
  };

  useEffect(() => {
    if (expenseToEdit && Object.keys(expenseToEdit).length > 0) {
      setExpenseForm(expenseToEdit);
      setId(expenseToEdit.id!);
      setDate(expenseToEdit.date!);
    }
  }, [expenseToEdit]);

  return (
    <div className="modal">
      <div className="close-modal">
        <img
          alt="Close Modal"
          onClick={handleCloseExpenseModal}
          src={CloseIcon}
        />
      </div>

      <form
        className={`form ${modalExpenseAnimation ? "animate" : "close"}`}
        onSubmit={handleSubmitExpenseForm}
      >
        <legend>
          {expenseToEdit?.expense ? "Edit Expense" : "Add New Expense"}
        </legend>
        {message && <Message type="error">{message}</Message>}
        <div className="field">
          <label htmlFor="expense">Expense</label>
          <input
            type="text"
            placeholder="Expense Name"
            name="expense"
            id="expense"
            value={expenseForm.expense}
            onChange={handleChangeExpenseForm}
          />
        </div>

        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="Expense Amount"
            name="amount"
            id="amount"
            value={expenseForm.amount!}
            onChange={handleChangeExpenseForm}
          />
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={expenseForm.category}
            onChange={handleChangeExpenseForm}
          >
            <option value="">-- Select a Category --</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="home">House</option>
            <option value="expenses">Various Expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>

        <input type="submit" value="Add Expense" />
      </form>
    </div>
  );
};

export default NewExpenseModal;
