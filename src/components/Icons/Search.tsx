import classNames from "classnames";
import { PropsIcon } from "./typePropsIcons";

export default function SearchIcon({ className }: PropsIcon) {
    const classNamesMapped = classNames("icon", className);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        className={classNamesMapped}
      >
        <path
          fill="none"
          stroke="#A445ED"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
        />
      </svg>
    );
}
