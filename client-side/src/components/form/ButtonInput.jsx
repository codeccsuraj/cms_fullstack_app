import React from 'react'

const ButtonInput = ({
    label="submit",
    type="button",
    onClick,
    className,
    loading=false,
    variant="primary"
}) => {
    if (variant === "primary") {
        className += " bg-[#00bf63] hover:bg-[#3de393] text-white"
    }
  return (
    <button
        type={type}
        disabled={loading}
        onClick={onClick}
        className={`px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer hover:shadow-lg ${className}`}
    >
        {loading ? "Loading..." : label}
    </button>
  )
}

export default ButtonInput
