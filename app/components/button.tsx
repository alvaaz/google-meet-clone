import { Link } from "@remix-run/react";
import React from "react";

type ButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  buttonTypes?: "primary" | "ghost";
  name?: string;
  value?: string;
  block?: boolean;
  type?: "primary" | "ghost";
  className?: string;
};

export default function Button({
  loading,
  children,
  onClick,
  href,
  disabled,
  htmlType,
  name,
  value,
  block,
  className,
  type = "primary",
}: ButtonProps) {
  const classes = (type: string) => {
    switch (type) {
      case "primary":
        return "disabled:opacity-50 group relative flex justify-center py-3 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm gap-2";
      case "ghost":
        return "disabled:opacity-50 group relative flex justify-center py-3 px-4 border border-transparent font-medium rounded-md text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm gap-2";
      default:
        return "disabled:opacity-50 group relative flex justify-center py-3 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm";
    }
  };

  if (href !== undefined) {
    return (
      <Link className={`${classes(type)} ${className}`} to={href}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={htmlType}
      name={name}
      value={value}
      className={`${classes(type)} ${block && "w-full"} ${className}`}
      disabled={disabled}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
