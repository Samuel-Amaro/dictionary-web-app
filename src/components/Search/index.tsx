import { useRef, useState, useEffect} from "react";
import SearchIcon from "../Icons/Search";
import "./Search.css";

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

  useEffect(() => {
    /*if (word === "") {
      setInputIsInvalid(true);
    }*/
    if(refInputSearch.current) {
      refInputSearch.current.value = word;
    }
  }, [word]);

  return (
    <>
      <form
        className={inputIsInvalid ? "search search--mg" : "search"}
        role="search"
        aria-label="enter a word to search for its definition"
      >
        <input
          type="search"
          ref={refInputSearch}
          aria-label="Search for any word"
          placeholder="Search for any word..."
          className={inputIsInvalid ? "search__input search__input--invalid" : "search__input"}
          name="search"
          /*defaultValue={word}*/
          title="Search for any word..."
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
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              updateValueInput();
            }
          }}
        >
          <SearchIcon className="search__icon" />
        </button>
      </form>
      {inputIsInvalid && (
        <span className="search__invalid-input" aria-live="polite">
          Whoops, can’t be empty…
        </span>
      )}
    </>
  );
}
