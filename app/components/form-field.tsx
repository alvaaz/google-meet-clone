import type { FormEvent } from "react";
import { useEffect, useState, useRef } from "react";

type FormFieldProps = {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
  placeholder: string;
  required?: boolean;
};

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
  required,
  placeholder,
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    onChange(e);
    setErrorText("");
  };

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="text-sm text-gray-700 font-medium mb-2 inline-block"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        onChange={handleChange}
        id={htmlFor}
        name={htmlFor}
        type={type}
        placeholder={placeholder}
        autoComplete={htmlFor}
        required={required}
        className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 shadow-sm"
        value={value}
      />
      <p className="mt-2 text-sm text-red-400">{errorText || ""}</p>
    </div>
  );
}
