import SearchIcon from "../Icons/Search";

export default function Search() {
    return (
      <form
        className="search"
        role="search"
        aria-label="enter a word to search for its definition"
      >
        <input
          type="search"
          aria-label="Search for any word"
          placeholder="Search for any word"
          className="search__input"
          name="search"
        />
        <button
          type="button"
          className="button-search"
          aria-label="button search"
        >
          <SearchIcon />
        </button>
      </form>
    );
}