import Logo from "../Icons/Logo";
import Moon from "../Icons/Moon";
import Select from "../Select";
import Switch from "../Switch";
import Search from "../Search";

type PropsHeader = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({word, setWord} : PropsHeader) {
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <Logo className="header__icon" />
          </div>
          <div className="header__controls">
            <Select optionsSelect={["Sans Serif", "Serif", "Mono"]} />
            <span className="header__diviser" aria-hidden="true"></span>
            <div className="header__container">
              <Switch />
              <Moon />
            </div>
          </div>
        </div>
        <Search word={word} setWord={setWord}/>
      </header>
    );
}