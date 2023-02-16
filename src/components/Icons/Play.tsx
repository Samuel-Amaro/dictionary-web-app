import classNames from "classnames";
import { PropsIcon } from "./typePropsIcons";

export default function Play({ className }: PropsIcon) {
  const classNamesMapped = classNames("icon", className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      className={classNamesMapped}
    >
      <g fill="#A445ED" fillRule="evenodd">
        <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
        <path d="M29 27v21l21-10.5z" />
      </g>
    </svg>
  );
}
