export default function Switch() {
    return (
      <div
        className="switch"
        role="switch"
        aria-checked={false /*themeContext.theme === "light" ? false : true*/}
        onPointerDown={(event) => {
          /*toggleStatus(event);
          themeContext.setToggleTheme(
            event.currentTarget.getAttribute("aria-checked") === "true"
              ? "dark"
              : "light"
          );*/
        }}
        aria-label="Site cores scheme switcher"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            /*toggleStatus(event);
            themeContext.setToggleTheme(
              event.currentTarget.getAttribute("aria-checked") === "true"
                ? "dark"
                : "light"
            );*/
          }
        }}
        tabIndex={0}
      >
        <span
          className="switch-controler"
          aria-label="Switch Controller to switch themes"
          title="Switch Controller to switch themes"
          tabIndex={0}
        ></span>
      </div>
    );
}