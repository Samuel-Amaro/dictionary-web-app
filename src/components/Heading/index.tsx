import React from "react";
import classNames from "classnames";
import "./Heading.css";

type PropsHeading = {
  children: React.ReactNode;
  level: number;
  className?: string;
};

export default function Heading({ children, level, className }: PropsHeading) {
  const classNameMaped = classNames(`heading${level}`, className);
  switch (level) {
    case 1:
      return <h1 className={classNameMaped}>{children}</h1>;
    case 2:
      return <h2 className={classNameMaped}>{children}</h2>;
    case 3:
      return <h3 className={classNameMaped}>{children}</h3>;
    case 4:
      return <h4 className={classNameMaped}>{children}</h4>;
    case 5:
      return <h5 className={classNameMaped}>{children}</h5>;
    case 6:
      return <h6 className={classNameMaped}>{children}</h6>;
    default:
      throw Error("Não possui heading neste nivel: " + level);
  }
}
