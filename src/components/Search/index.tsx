import Input from "../Input";
import SearchIcon from "../Icons/Search";

export default function Search() {
    return (
      <form
        className="search"
        role="search"
        aria-label="enter a word to search for its definition"
      >
        <Input />
        <SearchIcon />
      </form>
    );
}