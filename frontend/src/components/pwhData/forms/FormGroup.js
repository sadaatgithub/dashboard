import React from "react";

const FormGroup = ({ children }) => {
  return (
    <div
      className="flex flex-col md:flex-row  gap-x-8 flex-wrap [&>div>input]:border bg-white  p-2
    w-full border gap-2 [&>div]:flex [&>div]:flex-col [&>div>input]:gap-1
   [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none
    [&>div>input:focus]:border-indigo-500 [&>div>input]:text-gray-500"
    >
      {children}
    </div>
  );
};

export default FormGroup;
