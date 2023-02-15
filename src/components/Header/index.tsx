import Logo from "../Icons/Logo";
import Moon from "../Icons/Moon";
import Select from "../Select";
import Switch from "../Switch";

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
            <div className="header__group">
              <Switch />
              <Moon />
            </div>
          </div>
        </div>
      </header>
    );
}