import React from "react";



const tabArray = [
  "Personal",
  "Educational",
  "Family",
  "Medical",
  "Membership"
]

const Tabs = (props) => {
  const { formSteps, setFormSteps } = props;

  return (
    <>
      <div className="flex flex-row overflow-x-auto flex-wrap overflow-hidden">
        {tabArray.map((step, index) => {
          return (
            <button
              key={index}
              className={`${
                formSteps >= index 
                  ? `text-base active  ${formSteps === tabArray.length-1? formSteps===index?"last_tab":"":""}`
                  : "bg-slate-400 text-white"
              } font-medium  text-left p-2 border border-transparent cursor-pointer grow uppercase left-arrow
               relative `}
              onClick={(e) => {
                setFormSteps(index);
              }}
            >
             <span className="pl-8"> {index+1} &nbsp;
              {step}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
