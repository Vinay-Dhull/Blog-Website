import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options = [], label, className = "", required = false, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        required={required}
        className={`px-3 py-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 w-full transition duration-200 ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
