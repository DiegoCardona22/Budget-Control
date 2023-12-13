// @interfaces
interface IFiltersProps {
  filter: string;
  setFilter: (filters: string) => void;
}

const Filters = ({ filter, setFilter }: IFiltersProps) => (
  <div className="filters container shadow">
    <form>
      <div className="field">
        <label>Filter by Category</label>
        <select
          name="category"
          id="category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">-- All Categories --</option>
          <option value="saving">Saving</option>
          <option value="food">Food</option>
          <option value="home">House</option>
          <option value="expenses">Various Expenses</option>
          <option value="leisure">Leisure</option>
          <option value="health">Health</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
    </form>
  </div>
);

export default Filters;
