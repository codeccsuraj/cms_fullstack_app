import React, { memo, useMemo } from "react";
import Select from "react-select";

const getCustomStyles = (hasError = false) => ({
  control: (base, state) => ({
    ...base,
    width: "100%",
    minHeight: "42px",
    backgroundColor: state.isFocused ? "#ffffff" : "#f1f5f9", // bg-slate-100 → white on focus
    borderRadius: "16px", // rounded-2xl
    borderColor: hasError
      ? "#dc2626"
      : state.isFocused
        ? "#94a3b8"
        : "#94a3b8", // border-slate-400
    boxShadow: "none", // outline-0
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:hover": {
      borderColor: "#94a3b8",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 12px", // px-4
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),

  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#111827",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#e5e7eb"
      : state.isFocused
        ? "#e2e8f0"
        : "#ffffff",
    color: "#111827",
    cursor: "pointer",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "16px",
    overflow: "hidden",
    zIndex: 50,
  }),
});


const SelectInput = ({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  isMulti = false,
  isDisabled = false,
  isClearable = true,
}) => {
  // Convert primitive value → react-select option
  const selectedValue = isMulti
    ? options.filter(opt => value?.includes(opt.value))
    : options.find(opt => opt.value === value) || null;
  return (
    <Select
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      isDisabled={isDisabled}
      isClearable={isClearable}
      value={selectedValue}
      onChange={(option) => {
        if (isMulti) {
          onChange(option ? option.map(o => o.value) : []);
        } else {
          onChange(option ? option.value : "");
        }
      }}
      styles={getCustomStyles()}
      classNamePrefix="react-select"
    />
  );
};

export default SelectInput;
