import { useRef } from "react";
import SearchIcon from "../Icons/Search";

type PropsSearch = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({word, setWord} : PropsSearch) {
    
    const refInputSearch = useRef<HTMLInputElement>(null);

    function updateValueInput() {
      if (!refInputSearch.current) {
        throw new Error("refInput Search not value");
      }
      setWord(refInputSearch.current.value);
    }

    return (
      <form
        className="search"
        role="search"
        aria-label="enter a word to search for its definition"
      >
        <input
          type="search"
          ref={refInputSearch}
          aria-label="Search for any word"
          placeholder="Search for any word"
          className="search__input"
          name="search"
          title="Search for any word"
          defaultValue={word}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              updateValueInput();
            }
          }}
        />
        <button
          type="button"
          title="submit search"
          className="button-search"
          aria-label="button search"
          onPointerDown={(event) => {
            event.preventDefault();
            updateValueInput();
          }}
        >
          <SearchIcon />
        </button>
      </form>
    );
}