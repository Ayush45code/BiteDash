import type { ReactElement } from "react";


interface Butprops{
size:"md"| "lg";
tittle:string;
StartIcon?:ReactElement;

}

  const sizeStyle =(size:"md"|"lg")=>{
    return size === "md"
      ? " px-2 text-md md:px-4 md:py-2 md:text-xl"
      : "md:px-6 px-1 py-1 text-sm md:py-3 md:text-lg";
  }

export const Button=({size,tittle,StartIcon}:Butprops)=>{
    return <div className="flex justify-center ">
      <button className={`flex ${sizeStyle(size)} md:border-2 rounded-lg`}>
        <div className="flex items-center">
      <span className="md:w-6 md:h-6 md:mx-2">{StartIcon}</span>{tittle}
      </div></button></div>

}