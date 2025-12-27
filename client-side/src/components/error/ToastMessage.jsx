import React, { useEffect, useState } from "react";

const ToastMessage = ({ message = "" }) => {
  return (
    <div
      className="p-3 bg-red-200 border-2 border-red-500 text-sm"
    >
      {message}
    </div>
  );
};

export default ToastMessage;
