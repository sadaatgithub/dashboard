import React from "react";

const FormGroup = ({ children }) => {
  return (
    <div
      className="flex flex-col md:flex-row  gap-6 flex-wrap [&>div>input]:border bg-white  p-2
    w-full border  [&>div]:flex [&>div]:flex-col [&>div]:gap-2
   [&>div>input]:p-2 [&>div>label]:text-sm [&>div>input]:rounded-sm [&>div>input]:outline-none
    [&>div>input:focus]:border-indigo-500 [&>div>input]:text-gray-500 [&>div>input]:text-sm"
    >
      {children}
    </div>
  );
};

export default FormGroup;
