import Logo from "../Icons/Logo";
import Moon from "../Icons/Moon";
import Select from "../Select";
import Switch from "../Switch";
import Search from "../Search";
import "./Header.css";
import { useThemeContext } from "../../context/ThemeContext";

type PropsHeader = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ word, setWord }: PropsHeader) {
  const themeContext = useThemeContext();
  return (
    <header className="header">
      <div className="header__container">
        <Logo className="header__icon header__icon--logo" />
        <div className="header__controls">
          <Select optionsSelect={["Sans Serif", "Serif", "Mono"]} />
          <span className="header__diviser" aria-hidden="true"></span>
          <div className="header__container-switch">
            <Switch />
            <Moon
              color={themeContext.theme === "dark" ? "#A445ED" : "#838383"}
              className="header__icon header__icon--moon"
            />
          </div>
        </div>
      </div>
      <Search word={word} setWord={setWord} />
    </header>
  );
}
