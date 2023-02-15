import classNames from "classnames";
import { PropsIcon } from "./typePropsIcons";

export default function ArrowDown({ className }: PropsIcon) {
    const classNamesMapped = classNames("icon", className);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="8"
        viewBox="0 0 14 8"
        className={classNamesMapped}
      >
        <path
          fill="none"
          stroke="#A445ED"
          strokeWidth="1.5"
          d="m1 1 6 6 6-6"
        />
      </svg>
    );
}
