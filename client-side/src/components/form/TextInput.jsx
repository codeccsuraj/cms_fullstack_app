import React from 'react'

const TextInput = ({
    type = "text",
    name,
    id,
    value,
    onChange,
    onBlur,
    placeholder = "Type your text",
    autoComplete = "on",
    readOnly,
    ...rest
}) => {
    return (
        <input
            type={type}
            name={name}
            id={id || name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="block w-full bg-slate-100 px-4 py-2 outline-0 rounded-2xl 
                 border border-slate-400 focus:bg-white"
            readOnly={readOnly}
            {...rest}
        />
    )
}

export default TextInput
