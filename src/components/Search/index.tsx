import { useRef, useState} from "react";
import SearchIcon from "../Icons/Search";

type PropsSearch = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ word, setWord }: PropsSearch) {
  const [inputIsInvalid, setInputIsInvalid] = useState(false);
  const refInputSearch = useRef<HTMLInputElement>(null);

  function updateValueInput() {
    if (!refInputSearch.current) {
      throw new Error("refInput Search not value");
    }
    if (
      refInputSearch.current.value.trim() === ""
    ) {
      setInputIsInvalid(true);
      setWord(refInputSearch.current.value.trim());
      return;
    }
    setInputIsInvalid(false);
    setWord(refInputSearch.current.value);
  }

  /*useEffect(() => {
    if (word === "") {
      setInputIsInvalid(true);
    }
  });
  */

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
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            event.preventDefault();
            updateValueInput();
          }
        }}
      />
      {inputIsInvalid && (
        <span className="search__invalid-input" aria-live="polite">
          Whoops, can’t be empty…
        </span>
      )}
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
