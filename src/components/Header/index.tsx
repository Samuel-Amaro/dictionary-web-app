import Logo from "../Icons/Logo";
import Select from "../Select";

export default function Header() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <Logo className="header__icon" />
          </div>
          <div className="header__controls">
            <Select optionsSelect={["Sans Serif", "Serif", "Mono"]}/>
            <span className="header__diviser" aria-hidden="true"></span>
          </div>
        </div>
      </header>
    );
}